const express = require("express");
const router = express.Router();
const contact = require("../model/contact");

//post contact
router.post("/", async (req, res) => {
  const newContact = new contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });

  try {
    const result = await newContact.save();
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

//get contact list
router.get("/", async (req, res) => {
  try {
    const result = await contact.find();
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

//get contact by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await contact.findById({ _id: id });
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
// update contact
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  try {
    const result = await contact.findByIdAndUpdate(id, newContact);
    res.status(200).json({
      status: "ok",
      oldData: result,
      newData: newContact,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//delete contact
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await contact.findByIdAndDelete({ _id: id });
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
