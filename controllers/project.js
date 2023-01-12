const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getProject = function (req, res) {
  console.log(req.files);
  res.json("getProject");
};

exports.register = async function (req, res) {
  res.json("register");
};
exports.createProject = async function (req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  console.log(req.files);

  var avatar = req.files.avatar;
  var filename = avatar.name;
  avatar.mv("./uploads/" + filename, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("File Uploaded");
    }
  });
};

exports.deleteUser = function (req, res) {
  res.json("deleteUser");
};

exports.updateUser = function (req, res) {
  res.json("updateUser");
};
