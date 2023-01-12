const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.js");
const projectRouter = require("./routes/project.js");
var fileupload = require("express-fileupload");
const app = express();

app.use(bodyParser.json());
app.use(fileupload());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);

app.listen(3000, function () {
  console.log("Hey server is running on port 3000");
});
