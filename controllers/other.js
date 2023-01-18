const client = require("../db");

exports.getMapList = async function (req, res) {
  res.json("getMapList");
};
exports.createMapLocaiton = async function (req, res) {
  res.json("createMapLocaiton");
};
exports.deleteMap = async function (req, res) {
  res.json("deleteMap");
};
exports.updateMap = async function (req, res) {
  res.json("updateMap");
};
