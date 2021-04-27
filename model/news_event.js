const mongoose = require("mongoose");

const NewsEventSchema = mongoose.Schema({
  recent_news: {
    type: String,
    require: true,
  },
  news_date: {
    type: Date,
    require: true,
  },
  news_image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("NewsEvent", NewsEventSchema);
