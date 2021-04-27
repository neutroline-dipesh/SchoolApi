const mongoose = require("mongoose");

const AboutScema = mongoose.Schema({
  admin: {
    type: String,
    require: true,
  },
  faculties: {
    type: String,
    require: true,
  },
  profile_pic: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("about", AboutScema);
