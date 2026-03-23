const express = require("express");
const mongoose = require("mongoose");

const { fallbackProjects } = require("../data/fallbackData");
const Project = require("../models/Project");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ updatedAt: -1 }).lean();
      if (projects.length > 0) {
        return res.status(200).json({ data: projects, source: "mongodb" });
      }
    }

    return res.status(200).json({ data: fallbackProjects, source: "fallback" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch projects." });
  }
});

module.exports = router;
