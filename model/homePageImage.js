const mongoose = require("mongoose");

const HomePageImageSchama = mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: false,
  },
  key: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
  header: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("homePageImage", HomePageImageSchama);
