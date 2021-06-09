const express = require("express");
const router = express.Router();
const career = require("../model/career");
const auth = require("../middlewares/checkAuth");
//add new carrer
router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const newCareer = new career({
    department: req.body.department,
    title: req.body.title,
    vacancy: req.body.vacancy,
    posted_date: req.body.posted_date,
    status: req.body.status,
    description: req.body.description,
    
  });
  try {
    let result = await newCareer.save();
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
//get all carrer
router.get("/", async (req, res) => {
  try {
    const result = await career.find();
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
//get carrer by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await career.findById({ _id: id });
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
// update carrer
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const updatedCareer = {
    department: req.body.department,
    title: req.body.title,
    vacancy: req.body.vacancy,
    posted_date: req.body.posted_date,
    status: req.body.status,
    description: req.body.description,
  };
  console.log(updatedCareer);
  try {
    const result = await career.findByIdAndUpdate(id, updatedCareer);
    res.status(200).json({
      status: "ok",
      oldData: result,
      newData: updatedCareer,
    });
    console.log(updatedCareer)

  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//delete carrer
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await career.findByIdAndDelete({ _id: id });
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

module.exports = router;
