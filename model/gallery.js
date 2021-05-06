const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("gallery", GallerySchema);
