const express = require("express");
const router = express.Router();
const home = require("../model/home");
const path = require("path");
const multer = require("multer");

//for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });
//add home
router.post("/", upload.single("carousel_image"), async (req, res) => {
  console.log(req.body);
  const newHome = new home({
    announcement: req.body.announcement,
    announcement_date: req.body.announcement_date,
    notice: req.body.notice,
    event: req.body.event,
    notice_event_date: req.body.notice_event_date,
    carousel_image: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newHome.save();
    res.status(200).json({
      status: "ok",
      newBlog: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//get all home
router.get("/", async (req, res) => {
  try {
    const result = await home.find();
    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//get home by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await home.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
});
//update home
router.patch("/:id", upload.single("carousel_image"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newHome = {
    announcement: req.body.announcement,
    announcement_date: req.body.announcement_date,
    notice: req.body.notice,
    event: req.body.event,
    notice_event_date: req.body.notice_event_date,
    carousel_image: "http://" + req.headers.host + "/" + req.file.path,
  };
  console.log(newHome);
  try {
    const result = await home.findByIdAndUpdate(id, newHome);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newHome,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//delete home
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await home.findByIdAndDelete({ _id: id });
    console.log("delete sucessfull ");
    res.status(200).json({
      status: "ok",
      result: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
