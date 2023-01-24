const express = require("express");

const {
  login,
  register,
  deleteUser,
  updateUser,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
