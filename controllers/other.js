const client = require("../db");

//location queries
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
  const { name, address, phone, location, image } = req.body;

  if (!(name && address && phone && location && image)) {
    return res.status(400).send("All input is required");
  }
  try {
    var lid = Date.now().toString(16).toUpperCase();
    // console.log(new Date(parseInt("185C367C49D", 16))); 16 to 10
    const values = [name, lid, address, phone, location, image];
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
  const { lid, name, address, phone, location, image } = req.body;
  if (!(name && address && phone && location && image)) {
    return res.status(400).send("All input is required");
  }
  try {
    const values = [name, address, phone, location, image, lid];
    const sql =
      "UPDATE locations SET name=$1, address=$2, phone=$3, location=$4, image=$5 WHERE lid=$6";
    const result = await client.query(sql, values);
    res.status(200).send("successfully update location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating location");
  }
};

// social media queries
exports.getSocialMediaList = async function (req, res) {
  try {
    var sql = `select * from socialmedialist `;
    const result = await client.query(sql);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};
exports.createSocialMedia = async function (req, res) {
  const { socialmedia, username } = req.body;

  if (!(socialmedia && username)) {
    return res.status(400).send("All input is required");
  }

  try {

    const values = [socialmedia, username];
    const sql = "INSERT INTO socialmedialist (socialmedia, username) VALUES ($1, $2)";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};
exports.deleteSocialMedia = async function (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("All input is required");
  }
  try {
    await client.query(`DELETE from socialmedialist where id ='${id}'`);
    res.status(200).send("successfully deleteSocialMedia");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};
exports.updateSocialMedia = async function (req, res) {
  const { id, socialmedia, username } = req.body;

  if (!(socialmedia && username && id)) {
    return res.status(400).send("All input is required");
  }
  try {
    const values = [socialmedia, username, id];
    const sql = "UPDATE socialmedialist SET socialmedia=$1, username=$2 WHERE id=$3";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};
