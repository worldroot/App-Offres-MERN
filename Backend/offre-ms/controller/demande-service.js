const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");
const axios = require("axios");





// @route   Get api/offre/all
// @desc    Get all offre
// @access  Public
router.get("/all", async (req, res) => {
  try {
    const data = await Demande.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
