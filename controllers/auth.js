const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let users = [
  {
    name: "jhon",
    age: 20,
    id: 1,
  },
  {
    name: "amanda",
    age: 22,
    id: 2,
  },
  {
    name: "rick",
    age: 120,
    id: 3,
  },
];

exports.getUser = function (req, res) {
  var userId = req.body.id;

  res.json(users);
};

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

    let jwtSecretKey = "deneme";
    let data = {
      time: Date(),
      userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);
    return res.status(200).json({
      token: token,
      username: username,
      password: password,
    });
  } catch (error) {
    console.error(error.stack);
  }
};

exports.deleteUser = function (req, res) {
  // DELETE FROM public.userlist WHERE user_id = '1'

  const userId = req.params.id;

  users = users.filter(function (user) {
    return user.id !== userId;
  });

  res.json(users);
};

exports.updateUser = function (req, res) {
  const userId = req.params.id;
  const { age, name } = req.body;

  users = users.map(function (user) {
    if (user.id === userId) {
      return {
        name,
        age,
        id: user.id,
      };
    }

    return user;
  });

  res.json(users);
};
