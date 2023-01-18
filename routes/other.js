const express = require("express");

const {
  getMapList,
  createMapLocaiton,
  deleteMap,
  updateMap,
} = require("../controllers/other.js");

const router = express.Router();

router.get("/map", getMapList);
router.post("/map", createMapLocaiton);
router.delete("/map", deleteMap);
router.put("/map", updateMap);



module.exports = router;
