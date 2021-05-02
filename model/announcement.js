const mongoose = require("mongoose");

const AnnouncementSchema = mongoose.Schema({
  announcement: {
    type: String,
    require: true,
  },
  announcement_des: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("announcement", AnnouncementSchema);
