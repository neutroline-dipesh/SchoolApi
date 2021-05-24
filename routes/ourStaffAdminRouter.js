const express = require("express");
const router = express.Router();
const ourStaffAdmin = require("../model/ourStaffAdmin");
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
//add new ourStaffAdmin
router.post("/", auth, upload.single("profile_pic"), async (req, res) => {
  console.log(req.body);
  const newOurStaffAdmin = new ourStaffAdmin({
    name: req.body.name,
    faculties: req.body.faculties,
    profile_pic: "http://" + req.headers.host + "/" + req.file.path,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,

  });

  try {
    let result = await newOurStaffAdmin.save();
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
//get all ourStaffAdmin
router.get("/", async (req, res) => {
  try {
    const result = await ourStaffAdmin.find();
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
//get ourStaffAdmin by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await ourStaffAdmin.findOne({ _id: req.params.id });
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
//update ourStaffAdmin
router.patch("/:id", auth, upload.single("profile_pic"), async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newOurStaffAdmin = {
    name: req.body.name,
    faculties: req.body.faculties,
    profile_pic: "http://" + req.headers.host + "/" + req.file.path,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
  };
  console.log(newOurStaffAdmin);
  try {
    const result = await ourStaffAdmin.findByIdAndUpdate(id, newOurStaffAdmin);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newOurStaffAdmin,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//delete ourStaffAdmin
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ourStaffAdmin.findByIdAndDelete({ _id: id });
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
