const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const shell = require("shelljs");

const filePath = `deneme`;
exports.getProject = function (req, res) {
  return res.json("Post has been created.");
};

exports.upload = async function (req, res) {
  console.log(req.headers);
  uploads.array("files")(req, res, function (err) {
    res.json(`files ${req.files}...`);
  });
};
exports.createProject = async function (req, res) {
  const { descriptionEN, descriptionTR, projectName, features, paths } =
    req.body;

  if (!(descriptionEN && descriptionTR && projectName && features && paths)) {
    return res.status(400).send("All input is required");
  }

  const values = [projectName, descriptionEN, descriptionTR, features, paths];
  const sql =
    "INSERT INTO project (projectname,descriptionen,descriptiontr,features, paths) VALUES ($1, $2, $3, $4, $5)";

  try {
    const result = await client.query(sql, values);
    res.status(200).send("successfully created project");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
};

exports.deleteUser = function (req, res) {
  res.json("deleteUser");
};

exports.updateUser = function (req, res) {
  res.json("updateUser");
};

// Uploaded functions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "deneme");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  cb(null, true);
};
const uploads = multer({ storage: storage, fileFilter: fileFilter });
