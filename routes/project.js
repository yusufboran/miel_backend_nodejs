const express = require("express");

const {
  getProject,
  createProject,
  upload,
  deleteUser,
  updateUser,
} = require("../controllers/project.js");

const router = express.Router();

router.get("/", getProject);
router.post("/", createProject);
router.post("/upload", upload);
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
