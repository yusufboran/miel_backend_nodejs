const express = require("express");

const {
  getUser,
  login,
  register,
  deleteUser,
  updateUser,
} = require("../controllers/auth.js");

const router = express.Router();

router.get("/", getUser);
router.post("/login", login);
router.post("/register", register);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;
