const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = 4000;

//for path directory
global.appRoot = __dirname;
//for request parameter
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public/images", express.static("public/images"));
//reuire all  routes
const blogsRouter = require("./routes/blogsRouter");
const careerRouter = require("./routes/careerRouter");
const aboutRouter = require("./routes/aboutRouter");
const newsEventRouter = require("./routes/newsEventRouter");
const homeRouter = require("./routes/homeRouter");
const galleryRouter = require("./routes/galleryRouter");
const userRouter = require("./routes/userRouter");
const noticeRouter = require("./routes/noticeRouter");
const eventRouter = require("./routes/eventRouter");

//use all routes
app.use("/blogs", blogsRouter);
app.use("/career", careerRouter);
app.use("/about", aboutRouter);
app.use("/newsEvent", newsEventRouter);
app.use("/home", homeRouter);
app.use("/gallery", galleryRouter);
app.use("/user", userRouter);
app.use("/notice", noticeRouter);
app.use("/event", eventRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: " Bad request",
  });
});

//Mongo database connection
mongoose
  .connect("mongodb://localhost/school_api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log("Server start at port : " + PORT);
});
