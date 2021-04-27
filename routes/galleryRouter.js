const express = require("express");
const gallery = require("../model/gallery");
const router = express.Router();
const gallery = require("../model/gallery");

//add new gallery
router.post("/", async (req, res) => {
  const gallery = new gallery({
    // image:
    // video:
    // title:
  });
  try {
  } catch (err) {}
});
//get all gallery
//get gallery by id
// update gallery
//delete gallery
