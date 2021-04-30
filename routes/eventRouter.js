const express = require("express");
const router = express.Router();
const events = require("../model/event");
const auth = require("../middlewares/checkAuth");

//add new event
router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const newEvent = new events({
    title: req.body.title,
    event_date: req.body.event_date,
    event_desc: req.body.event_desc,
  });
  console.log(newEvent);
  try {
    const result = await newEvent.save();
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

//get all event
router.get("/", async (req, res) => {
  try {
    const result = await events.find();
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

//get event by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await events.findOne({ _id: req.params.id });
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

// delete event by id
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await events.findByIdAndDelete({ _id: id });
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

//update event
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newEvent = {
    title: req.body.title,
    event_date: req.body.event_date,
    event_desc: req.body.event_desc,
  };
  console.log(newEvent);
  try {
    const result = await events.findByIdAndUpdate(id, newEvent);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newEvent,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
