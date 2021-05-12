const express = require("express");
const router = express.Router();
const album = require("../model/album");
const multer = require("multer");
const path = require("path");
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

//add new album
router.post("/", auth, upload.single("thumbnail"), async (req, res) => {
  console.log(req.body);
  const newAlbum = new album({
    album_name: req.body.album_name,
    thumbnail: "http://" + req.headers.host + "/" + req.file.path,
  });

  try {
    let result = await newAlbum.save();
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
//add images in album
router.post("/images/:id", (req, res) => {
  const id = req.params.id;
  const item = {
    album_item_id: req.body.album_item_id,
  };
  try {
    const result = album.findById(id, (err, album) => {
      if (album) {
        // The below two lines will add the newly saved review's
        // ObjectID to the the User's reviews array field
        album.images.push(item);
        album.save();
        res.status(200).json({
          status: "ok",
          message: "image inserted in album ",
        });
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//get all album
router.get("/", async (req, res) => {
  try {
    const result = await album.find();
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
//get album by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await album.findOne({ _id: req.params.id });
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

// delete album
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await album.findByIdAndDelete({ _id: id });
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
//remove an gallery from  from album
router.delete("/images/:id", async (req, res) => {
  const album_id = req.params.id;
  const album_item_id = req.body.album_item_id;

  try {
    await album.updateOne(
      { _id: album_id },
      { $pull: { images: { _id: album_item_id } } }
    );
    res.send("items removed Successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//update blogs
router.patch("/:id", auth, upload.single("thumbnail"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newAlbum = {
    album_name: req.body.album_name,
    thumbnail: "http://" + req.headers.host + "/" + req.file.path,
  };

  try {
    const result = await album.findByIdAndUpdate(id, newAlbum);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newAlbum,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/*  
this function takes three id parameter 
1.offerid (from params),
2.offer_item_id(from body)
3.menu_item_id (from bod)
*/
router.patch("/images/:id", async (req, res) => {
  const album_id = req.params.id;
  const album_item_id = req.body.album_item_id;

  // const item = {
  //   _menu: req.body.menu_id,

  // };
  try {
    await album.updateOne(
      { _id: album_id, "images._id": album_item_id },
      {
        $set: {
          "images.$._gallery": req.body._gallery_id,
        },
      }
    );
    res.send("items updated Successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
