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

exports.register = function (req, res) {
  const { username, password } = req.body;

  users.push({
    username,
    password,
    id: Date.now(),
  });

  res.json(users);
};
exports.login = function (req, res) {
  const userId = req.params.id;

  const user = users.find(function (user) {
    return user.id === userId;
  });

  res.json(user);
};

exports.deleteUser = function (req, res) {
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
