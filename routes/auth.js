const express = require("express");

const {
  getUser,
  login,
  register,
  deleteUser,
  updateUser,
} = require("../controllers/auth.js");

const router = express.Router();

//router.get("/", getUser);
router.post("/login", login);
router.post("/register", register);
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
