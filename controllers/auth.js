const client = require("../db");
const bcrypt = require("bcrypt");
const { tokenGenerator, checkTokenValidity } = require("./token");

exports.register = async function (req, res) {
  try {
    const { email, password, username } = req.body;

    if (!(email && password && username)) {
      return res.status(412).send("All input is required");
    }
    const user = await client.query(
      `SELECT * FROM public.userlist WHERE email = '${email}'`
    );
    if (user.rows.length !== 0) {
      res.status(406).json({
        message: "there is an account",
      });
    }

    const hashPass = bcrypt.hashSync(password, 5);
    const result = await client.query(
      `INSERT INTO userlist (email, password,username) VALUES('${email}', '${hashPass}','${username}' );`
    );
    res.status(200).send("success");
  } catch (error) {
    console.error(error.stack);
  }
};
exports.login = async function (req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(412).send("All input is required");
  }

  const result = await client.query(
    `SELECT * FROM public.userlist WHERE email = '${email}'`
  );

  if (result.rows.length === 0)
    return res.status(401).json({ error: "email is incorrect" });
  const validPassword = await bcrypt.compare(
    password,
    result.rows[0]["password"]
  );

  if (!validPassword)
    return res.status(401).json({ error: "Incorrect password" });
  try {
    const token = tokenGenerator();
    return res.status(200).json({
      token: token,
      email: email,
      username: result.rows[0].username,
    });
  } catch (error) {
    console.error(error.stack);
  }
};
exports.deleteUser = function (req, res) {
  res.json("deleteUser");
};
exports.updateUser = async function (req, res) {
  const { token, username, email, newEmail, oldpassword, newpassword } =
    req.body;
  if (!(token && username && email && newEmail && newpassword && oldpassword)) {
    return res.status(400).send("All input is required");
  }
  const isTokenValid = await checkTokenValidity(token);
  if (!isTokenValid) {
    return res.status(401).send("Token is invalid");
  }
  var sql = `SELECT * FROM public.userlist WHERE email = '${email}'`;

  const result = await client.query(sql);
  if (!result.rows[0])
    return res.status(401).json({ error: "email is incorrect" });

  const validPassword = await bcrypt.compare(
    oldpassword,
    result.rows[0]["password"]
  );
  if (!validPassword)
    return res.status(401).json({ error: "Incorrect password" });

  const hashPass = bcrypt.hashSync(newpassword, 5);
  var sql = `UPDATE userlist
SET "password"='${hashPass}'
, username='${username}',
email= '${newEmail}'
WHERE user_id=${result.rows[0]["user_id"]}`;
  await client.query(sql);

  res.status(200).send("successfully");
};
