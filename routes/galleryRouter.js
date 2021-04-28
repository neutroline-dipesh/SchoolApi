const express = require("express");
const router = express.Router();
const gallery = require("../model/gallery");
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

// const filefilter = (req, file, cb) => {
//   if (
//     file.mimetype == "image/jpeg" ||
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "video/mp4" ||
//     file.mimetype == "video/gif"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage: storage });
// var uploadMultiple = upload.fields([
//   {
//     name: "image",
//     maxCount: 1,
//   },
//   {
//     name: "video",
//     maxCount: 1,
//   },
// ]);
//add new gallery
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    // console.log(req.body);
    // console.log(req.file.path);
    // console.log(req.body.video);

    const newGallery = new gallery({
      // image: "http://" + req.headers.host + "/" + req.file.path,
      image: "http://" + req.headers.host + "/" + req.files.image[0].path,
      video: "http://" + req.headers.host + "/" + req.files.video[0].path,
      title: req.body.title,
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
  }
);

//get all gallery
//get gallery by id
// update gallery
//delete gallery

module.exports = router;
