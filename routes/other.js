const express = require("express");

const {
  getMapList,
  createMapLocaiton,
  deleteMap,
  updateMap,
  
  getSocialMediaList,
  createSocialMedia,
  deleteSocialMedia,
  updateSocialMedia,
} = require("../controllers/other.js");

const router = express.Router();
//location queries
router.get("/map", getMapList);
router.post("/map", createMapLocaiton);
router.delete("/map", deleteMap);
router.put("/map", updateMap);

//social media queries
router.get("/socialmedia", getSocialMediaList);
router.post("/socialmedia", createSocialMedia);
router.delete("/socialmedia", deleteSocialMedia);
router.put("/socialmedia", updateSocialMedia);

module.exports = router;
