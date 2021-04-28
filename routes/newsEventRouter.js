const express = require("express");
const router = express.Router();
const newsEvent = require("../model/newsEvent");
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

//add new newsEvent;
router.post("/", upload.single("news_image"), async (req, res) => {
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
//updare newsEvent
//delete newsEvent
module.exports = router;
