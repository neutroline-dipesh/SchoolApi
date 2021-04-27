const express = require("express");
const router = express.Router();
const blogs = require("../model/blogs");
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
//insert new post
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const blog = new blogs({
    image: "http://" + req.headers.host + "/" + req.file.path,
    title: req.body.title,
    article: req.body.article,
    posted_date: req.body.posted_date,
  });

  try {
    let result = await blog.save();
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
//get all blogs
router.get("/", async (req, res) => {
  try {
    const result = await blogs.find();
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

//get blog by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await blogs.findOne({ _id: req.params.id });
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
// delete blogs
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await blogs.findByIdAndDelete({ _id: id });
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
//update blogs
router.patch("/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const blog = {
    image: "http://" + req.headers.host + "/" + req.file.path,
    title: req.body.title,
    article: req.body.article,
    posted_date: req.body.posted_date,
  };
  console.log(blog);
  try {
    const result = await blogs.findByIdAndUpdate(id, blog);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: blog,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
module.exports = router;
