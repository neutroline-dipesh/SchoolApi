const mongoose = require("mongoose");

const CarrerSchema = mongoose.Schema({
  department: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  job_id: {
    type: String,
    require: true,
  },
  psted_date: {
    type: Date,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("carrer", CarrerSchema);
