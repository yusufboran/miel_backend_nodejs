const express = require("express");

const {
  getProject,
  getProjectList,
  createProject,
  upload,
  deleteProject,
  updateUser,
} = require("../controllers/project.js");

const router = express.Router();

router.get("/", getProjectList);
router.get("/:id", getProject);
router.post("/", createProject);
router.post("/upload", upload);
router.delete("/", deleteProject);
router.put("/", updateUser);

module.exports = router;
