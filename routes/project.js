const express = require("express");

const {
  getProject,
  createProject,
  register,
  deleteUser,
  updateUser,
} = require("../controllers/project.js");

const router = express.Router();

router.get("/", getProject);
router.post("/", createProject);
router.post("/register", register);
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
