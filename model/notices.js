const mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  notice_date: {
    type: Date,
    required: false,
  },
  notice_desc: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("notices", NoticeSchema);
