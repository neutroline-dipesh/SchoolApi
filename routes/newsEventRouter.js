const express = require("express");
const router = express.Router();
const newsEvent = require("../model/newsEvent");
const path = require("path");
const multer = require("multer");
const auth = require("../middlewares/checkAuth");
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

//add new newsEvent;
router.post("/", auth, upload.single("news_image"), async (req, res) => {
  console.log(req.body);
  const newNewsEvent = new newsEvent({
    recent_news: req.body.recent_news,
    news_date: req.body.news_date,
    news_image: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newNewsEvent.save();
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
//get all newsEvent
router.get("/", async (req, res) => {
  try {
    const result = await newsEvent.find();
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
//get newsEvent by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await newsEvent.findOne({ _id: req.params.id });
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
//updare newsEvent
router.patch("/:id", auth, upload.single("news_image"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newNewsEvent = {
    recent_news: req.body.recent_news,
    news_date: req.body.news_date,
    news_image: "http://" + req.headers.host + "/" + req.file.path,
  };

  console.log(newAbout);
  try {
    const result = await newsEvent.findByIdAndUpdate(id, newNewsEvent);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newNewsEvent,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//delete newsEvent
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await newsEvent.findByIdAndDelete({ _id: id });
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
