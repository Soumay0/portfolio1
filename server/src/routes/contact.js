const express = require("express");
const { isMailConfigured, sendContactEmail } = require("../lib/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      return res.status(200).json({
        message: "Email accepted in development mode (SMTP not configured).",
        simulated: true
      });
    }

    return res.status(500).json({ message: "Mailer is not configured on server." });
  }

  try {
    await sendContactEmail({ name, email, message });
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to send email right now." });
  }
});

module.exports = router;
