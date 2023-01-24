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

  getFeatures,
  createFeatures,
  deleteFeatures,
  updateFeatures,

  getConcactForm,
  createConcactForm,
  deleteConcactForm
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

//features
router.get("/features", getFeatures);
router.post("/features", createFeatures);
router.delete("/features", deleteFeatures);
router.put("/features", updateFeatures);

//contact form
router.get("/contactform", getConcactForm);
router.post("/contactform", createConcactForm);
router.delete("/contactform", deleteConcactForm);
module.exports = router;
