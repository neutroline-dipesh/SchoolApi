const express = require("express");
const router = express.Router();
const about = require("../model/about");
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

//add new about
router.post("/", upload.single("profile_pic"), async (req, res) => {
  console.log(req.body);
  const newAbout = new about({
    admin: req.body.admin,
    faculties: req.body.faculties,
    profile_pic: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newAbout.save();
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
//get all about
router.get("/", async (req, res) => {
  try {
    const result = await about.find();
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
//get about by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await about.findOne({ _id: req.params.id });
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
//update about
router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newAbout = {
    admin: req.body.admin,
    faculties: req.body.faculties,
    profile_pic: "http://" + req.headers.host + "/" + req.file.path,
  };
  console.log(newAbout);
  try {
    const result = await about.findByIdAndUpdate(id, newAbout);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newAbout,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//delete about
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await about.findByIdAndDelete({ _id: id });
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
