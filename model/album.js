const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
  album_name: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  images: [
    {
      _gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gallery",
      },
    },
  ],
});

module.exports = mongoose.model("album", AlbumSchema);
