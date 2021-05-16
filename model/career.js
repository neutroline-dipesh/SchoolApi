const { string } = require("@hapi/joi");
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
  vacancy: {
    type: Number,
    require: true,
  },
  posted_date: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("carrer", CarrerSchema);
