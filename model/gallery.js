const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  image: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("gallery", GallerySchema);
