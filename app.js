const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

//for path directory
global.appRoot = __dirname;
//for request parameter
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//reuire all  routes
const blogsRouter = require("./routes/blogsRouter");
const careerRouter = require("./routes/careerRouter");
//use all routes
app.use("/blogs", blogsRouter);
app.use("/career", careerRouter);

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
