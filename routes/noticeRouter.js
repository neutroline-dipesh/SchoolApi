const express = require("express");
const router = express.Router();
const notices = require("../model/notices");
const auth = require("../middlewares/checkAuth");

//add new notice
router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const newNotice = new notices({
    title: req.body.title,
    notice_date: req.body.notice_date,
    notice_desc: req.body.notice_desc,
  });
  console.log(newNotice);
  try {
    const result = await newNotice.save();
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

//get all notices
router.get("/", async (req, res) => {
  try {
    const result = await notices.find();
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

//get notices by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await notices.findOne({ _id: req.params.id });
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

// delete notice by id
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await notices.findByIdAndDelete({ _id: id });
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

//update notice
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newNotice = {
    title: req.body.title,
    notice_date: req.body.notice_date,
    notice_desc: req.body.notice_desc,
  };
  console.log(newNotice);
  try {
    const result = await notices.findByIdAndUpdate(id, newNotice);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newNotice,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
module.exports = router;
