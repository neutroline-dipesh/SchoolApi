const mongoose = require("mongoose");

const HomeSchema = mongoose.Schema({
  announcement: {
    type: String,
    require: true,
  },
  announcement_date: {
    type: Date,
    require: true,
  },
  carousel_image: {
    type: String,
  },
  notice: {
    type: String,
    require: true,
  },
  event: {
    type: String,
    require: true,
  },
  notice_event_date: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("home", HomeSchema);
