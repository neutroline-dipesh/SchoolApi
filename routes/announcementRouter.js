const express = require("express");
const router = express.Router();
const announcement = require("../model/announcement");
const path = require("path");
const multer = require("multer");
const auth = require("../middlewares/checkAuth");

//add announcement
router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const newAnnouncement = new announcement({
    announcement: req.body.announcement,
    announcement_des: req.body.announcement_des,
  });

  try {
    let result = await newAnnouncement.save();
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
//get all home
router.get("/", async (req, res) => {
  try {
    const result = await announcement.find();
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
//get announcement by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await announcement.findOne({ _id: req.params.id });
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
//update home
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newAnnouncement = {
    announcement: req.body.announcement,
    announcement_des: req.body.announcement_des,
  };
  console.log(newHome);
  try {
    const result = await announcement.findByIdAndUpdate(id, newAnnouncement);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newAnnouncement,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//delete home
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await announcement.findByIdAndDelete({ _id: id });
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
