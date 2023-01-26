const client = require("../db");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require("./token");

exports.register = async function (req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        message: "Username or password is missing",
      });
    }

    const user = await client.query(
      `SELECT * FROM public.userlist WHERE username = '${username}'`
    );
    if (user.rows.length !== 0) {
      res.status(406).json({
        message: "there is an account",
      });
    }

    const hashPass = bcrypt.hashSync(password, 5);
    const result = await client.query(
      `INSERT INTO userlist (username, password) VALUES('${username}', '${hashPass}');`
    );
    res.status(200).send("success");
  } catch (error) {
    console.error(error.stack);
  }
};
exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    const result = await client.query(
      `SELECT * FROM public.userlist WHERE username = '${username}'`
    );
    if (result.rows.length === 0)
      return res.status(401).json({ error: "username is incorrect" });

    const validPassword = await bcrypt.compare(
      password,
      result.rows[0]["password"]
    );
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    const token = tokenGenerator();
    return res.status(200).json({
      token: token,
      email: username,
    });
  } catch (error) {
    console.error(error.stack);
  }
};
exports.deleteUser = function (req, res) {
  res.json("deleteUser");
};
exports.updateUser = function (req, res) {
  res.json("updateUser");
};
