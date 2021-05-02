const mongoose = require("mongoose");

const HomePageImageSchama = mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("homePageImage", HomePageImageSchama);
