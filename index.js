const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.js");
const projectRouter = require("./routes/project.js");
const otherRouter = require("./routes/other.js");


var cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/", otherRouter);

app.listen(3000, function () {
  console.log("Hey server is running on port 3000");
});
