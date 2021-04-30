const mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notice_date: {
    type: Date,
    required: true,
  },
  notice_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notices", NoticeSchema);
