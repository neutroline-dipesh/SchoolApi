const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  event_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("event", EventSchema);
