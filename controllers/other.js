const client = require("../db");

exports.getMapList = async function (req, res) {
  try {
    var sql = `select * from locations `;
    const result = await client.query(sql);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating project");
  }
};
exports.createMapLocaiton = async function (req, res) {
  const { name, adress, phone, location, image } = req.body;

  if (!(name && adress && phone && location && image)) {
    return res.status(400).send("All input is required");
  }

  var lid = Date.now().toString(16).toUpperCase();
  // console.log(new Date(parseInt("185C367C49D", 16))); 16 to 10

  const values = [name, lid, adress, phone, location, image];

  try {
    const sql =
      "INSERT INTO locations (name, lid,address,phone,location,image) VALUES ($1, $2, $3, $4, $5,$6)";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating location");
  }
};
exports.deleteMap = async function (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("All input is required");
  }
  try {
    await client.query(`DELETE from locations where lid ='${id}'`);
    res.status(200).send("successfully deleteMap");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating location");
  }
};
exports.updateMap = async function (req, res) {
  const { id, name, adress, phone, location, image } = req.body;

  if (!(name && adress && phone && location && image)) {
    return res.status(400).send("All input is required");
  }
  try {
    const values = [name, adress, phone, location, image, id];
    const sql =
      "UPDATE locations SET name=$1, address=$2, phone=$3, location=$4, image=$5 WHERE lid=$6";
    const result = await client.query(sql, values);
    res.status(200).send("successfully update location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating location");
  }
};
