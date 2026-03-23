const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  return res.status(200).json({ message: "Message received successfully." });
});

module.exports = router;
