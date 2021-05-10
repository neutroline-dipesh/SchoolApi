const express = require("express");
const router = express.Router();
const gallery = require("../model/gallery");
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

const upload = multer({ storage: storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const newGallery = new gallery({
    image: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newGallery.save();
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

//get all gallery
router.get("/", async (req, res) => {
  try {
    const result = await gallery.find();
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
//get gallery by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await gallery.findOne({ _id: req.params.id });
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
// update gallery
router.patch("/:id", auth, upload.single("image"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newGallery = {
    image: "http://" + req.headers.host + "/" + req.file.path,
  };
  console.log(newGallery);
  try {
    const result = await gallery.findByIdAndUpdate(id, newGallery);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newGallery,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//delete gallery
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await gallery.findByIdAndDelete({ _id: id });
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
