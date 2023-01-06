import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);

app.listen(3000, function () {
  console.log("Hey server is running on port 3000");
});
