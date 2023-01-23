const client = require("../db");
var { unlink } = require("node:fs");
const multer = require("multer");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const shell = require("shelljs");

exports.getProject = async function (req, res) {
  const { id } = req.params;
  console.log("getProject");
  if (!id) {
    return res.status(400).send("All input is required");
  }

  try {
    var sql = `select paths from project where pid ='${id}'`;
    console.log(sql);

    const result = await client.query(sql);
    console.log(result.rows[0].paths);

    res.status(200).json({
      messega: "successfully deleteProject",
      data: result.rows[0].paths,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
};

exports.getProjectList = async function (req, res) {
  try {
    var sql = `select * from project `;
    const result = await client.query(sql);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
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

  var pid = Date.now().toString(16).toUpperCase();

  const values = [
    projectName,
    descriptionEN,
    descriptionTR,
    features,
    paths,
    pid,
  ];
  const sql =
    "INSERT INTO project (projectname,descriptionen,descriptiontr,features, paths,created_at ,pid) VALUES ($1, $2, $3, $4, $5,now(),$6)";

  try {
    const result = await client.query(sql, values);
    res.status(200).send("successfully created project");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
};

exports.deleteProject = async function (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("All input is required");
  }
  try {
    var sql = `select paths from project where pid ='${id}'`;
    console.log(sql);

    const result = await client.query(sql);
    console.log(result.rows[0].paths);

    result.rows[0].paths.map((path) => {
      unlink(`./uploads/${path}`, (err) => {
        if (err) throw err;
        console.log("delete successfully deleted project");
      });
    });

    await client.query(`DELETE from project where pid ='${id}'`);
    res.status(200).send("successfully deleteProject");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
};

exports.updateUser = function (req, res) {
  res.json("updateUser");
};

// Uploaded functions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  cb(null, true);
};
const uploads = multer({ storage: storage, fileFilter: fileFilter });
