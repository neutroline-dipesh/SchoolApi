const mongoose = require("mongoose");

const AlbumSchama = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thum_nail: {
    type: String,
    required: true,
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

module.exports = mongoose.model("album", AlbumSchama);
