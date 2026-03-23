const express = require("express");
const mongoose = require("mongoose");

const { fallbackCertificates } = require("../data/fallbackData");
const Certificate = require("../models/Certificate");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const certificates = await Certificate.find().sort({ updatedAt: -1 }).lean();
      if (certificates.length > 0) {
        return res.status(200).json({ data: certificates, source: "mongodb" });
      }
    }

    return res.status(200).json({ data: fallbackCertificates, source: "fallback" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch certificates." });
  }
});

module.exports = router;
