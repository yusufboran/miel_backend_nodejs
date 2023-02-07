const client = require("../db");
var { unlink } = require("node:fs");
const multer = require("multer");
const { checkTokenValidity } = require("./token");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const shell = require("shelljs");

exports.getProject = async function (req, res) {
  const { id } = req.params;
  console.log("getProject");
  if (!id) {
    return res.status(412).send("All input is required");
  }

  try {
    var sql = `select * from project where pid ='${id}'`;
    console.log(sql);

    const result = await client.query(sql);
    console.log(result.rows[0].paths);

    res.status(200).json(result.rows[0]);
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
  uploads.array("files")(req, res, function (err) {
    res.json(`files ${req.files}...`);
  });
};
exports.createProject = async function (req, res) {
  const { descriptionEN, descriptionTR, projectName, features, paths, token } =
    req.body;

  if (
    !(
      descriptionEN &&
      descriptionTR &&
      projectName &&
      features &&
      paths &&
      token
    )
  ) {
    return res.status(412).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }

  var tokenSql = `select final_time from token_list where token ='${token}'`;
  var tokenSqlResult = await client.query(tokenSql);
  var tokenTime = tokenSqlResult.rows[0]["final_time"];

  if (tokenTime < Date.now())
    return res.status(401).send("Token is out of date");

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
  const { id, token } = req.body;
  if (!(id, token)) {
    return res.status(412).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    var sql = `select paths from project where pid ='${id}'`;

    const result = await client.query(sql);
    console.log(result.rows[0].paths);

    result.rows[0].paths.map((path) => {
      unlink(`./uploads/${path}`, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Error occurred while deleting the project files");
        }
        console.log(`Successfully deleted file: ${path}`);
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
