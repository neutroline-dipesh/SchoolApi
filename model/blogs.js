const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  article: {
    type: String,
    require: true,
  },
  posted_date: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("blogs", BlogsSchema);
