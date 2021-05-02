const express = require("express");
const router = express.Router();
const homePageImage = require("../model/homePageImage");
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
//add homePageImage
router.post("/", auth, upload.single("src"), async (req, res) => {
  console.log(req.body);
  const newHomePageImage = new homePageImage({
    altText: req.body.altText,
    key: req.body.key,
    caption: req.body.caption,
    header: req.body.header,
    src: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newHomePageImage.save();
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

//get all homePageImage
router.get("/", async (req, res) => {
  try {
    const result = await homePageImage.find();
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

//get homePageImage by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await homePageImage.findOne({ _id: req.params.id });
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

//updare homePageImage
router.patch("/:id", auth, upload.single("src"), async (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  const newHomePageImage = {
    altText: req.body.altText,
    key: req.body.key,
    caption: req.body.caption,
    header: req.body.header,
    src: "http://" + req.headers.host + "/" + req.file.path,
  };

  console.log(newHomePageImage);
  try {
    const result = await homePageImage.findByIdAndUpdate(id, newHomePageImage);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newHomePageImage,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//delete homePageImage
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await homePageImage.findByIdAndDelete({ _id: id });
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
