const client = require("../db");
const { checkTokenValidity } = require("./token");
const nodemailer = require("nodemailer");
var { unlink } = require("node:fs");

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
  const { name, address, phone, location, image, token } = req.body;

  if (!(name && address && phone && location && image && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
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
  const { id, token } = req.body;
  if (!(id && token)) {
    return res.status(400).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
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
  const { lid, name, address, phone, location, image, token } = req.body;
  if (!(name && address && phone && location && image && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
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
  const { socialmedia, username, token } = req.body;
  console.log(req.body);
  if (!(socialmedia && username && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    const values = [socialmedia, username];
    const sql =
      "INSERT INTO socialmedialist (socialmedia, username) VALUES ($1, $2)";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};
exports.deleteSocialMedia = async function (req, res) {
  const { id, token } = req.body;
  if (!(id && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
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
  const { id, username, token } = req.body;

  if (!(username && id && token)) {
    return res.status(400).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    const values = [username, id];
    const sql = "UPDATE socialmedialist SET  username=$1 WHERE id=$2";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating social media event");
  }
};

//features
exports.getFeatures = async function (req, res) {
  try {
    var sql = `select * from features `;
    const result = await client.query(sql);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};
exports.createFeatures = async function (req, res) {
  const { title, trtext, entext, token } = req.body;

  if (!(title && trtext && entext && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    const values = [title, trtext, entext];
    const sql =
      "INSERT INTO features (title, trtext,entext) VALUES ($1, $2,$3)";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};
exports.deleteFeatures = async function (req, res) {
  const { id, token } = req.body;
  if (!(id && token)) {
    return res.status(400).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    await client.query(`DELETE from features where id ='${id}'`);
    res.status(200).send("successfully deleteSocialMedia");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};
exports.updateFeatures = async function (req, res) {
  const { id, title, trtext, entext, token } = req.body;

  if (!(title && trtext && entext && id && token)) {
    return res.status(400).send("All input is required");
  }

  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    const values = [title, trtext, entext, id];
    const sql = "UPDATE features SET title=$1, trtext=$2,entext=$3 WHERE id=$4";
    const result = await client.query(sql, values);
    res.status(200).send("successfully created location");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};

//contact form
exports.getConcactForm = async function (req, res) {
  var sql = `select * from contactform `;
  const result = await client.query(sql);
  res.status(200).send(result.rows);
};
exports.createConcactForm = async function (req, res) {
  const { email, message, name, phone } = req.body;

  if (!(email && message && name && phone)) {
    return res.status(400).send("All input is required");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yusuf.boran@rbbt.com.tr",
      pass: "qyygdxyzzivrodvi",
    },
  });
  let mailOptions = {
    from: "yusuf.boran@rbbt.com.tr",
    to: email,
    subject: "Nodemailer Test",
    html: `<p>Sayın ${name} <br> Mesajınız alınmıştır. En kısa zamanda arkadaşlarımız sizinle iletişime geçecektir.</p>`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    else console.log("mail gonderildi");
  });

  try {
    const values = [email, message, name, phone];
    const sql =
      "INSERT INTO contactform (email, name, phone, message, date) VALUES ($1, $2,$3,$4, now())";
    const result = await client.query(sql, values);
    res.status(200).send("successfully createConcactForm");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};

exports.deleteConcactForm = async function (req, res) {
  const { id, token } = req.body;
  if (!(id && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  try {
    await client.query(`DELETE from contactform where id ='${id}'`);
    res.status(200).send("successfully deleteSocialMedia");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating features");
  }
};

//about page
exports.getAboutContext = async function (req, res) {
  var sql = `select * from about_page `;
  const result = await client.query(sql);
  res.status(200).send(result.rows);
};
exports.createAboutContext = async function (req, res) {
  const { title, image_path, token, contextTr, contextEn } = req.body;
  console.log(req.body);
  if (!(title && image_path && contextTr && contextEn && token)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }

  var sql = `select image_path from about_page  where title= '${title}'`;
  var deleteImg = await client.query(sql);

  try {
    var sql = `UPDATE about_page 
    SET image_path='${image_path}', 
    context='${contextTr}' ,
    context_tr='${contextTr}' ,context_en='${contextEn}'  where title= '${title}'`;
    const result = await client.query(sql);
    res.status(200).send("successfully About Page");

    unlink(`./uploads/${deleteImg.rows[0].image_path}`, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Error occurred while deleting the project files");
      }
      console.log(`Successfully deleted file: ${deleteImg.rows[0].image_path}`);
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Error occurred while creating About Page");
  }
};
