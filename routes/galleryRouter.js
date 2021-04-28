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

router.post(
  "/",
  auth,
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
    0;

    const newGallery = new gallery({
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
router.patch(
  "/:id",
  auth,
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
    const id = req.params.id;
    console.log(id);
    const newGallery = {
      image: "http://" + req.headers.host + "/" + req.files.image[0].path,
      video: "http://" + req.headers.host + "/" + req.files.video[0].path,
      title: req.body.title,
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
  }
);
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
