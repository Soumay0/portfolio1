const express = require("express");
const { isMailConfigured, sendContactEmail } = require("../lib/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("[Contact Route] Received request - Name:", name, "Email:", email);
  console.log("[Contact Route] NODE_ENV:", process.env.NODE_ENV);
  console.log("[Contact Route] Mail configured?", isMailConfigured());
  console.log("[Contact Route] SMTP_HOST:", process.env.SMTP_HOST);
  console.log("[Contact Route] SMTP_USER:", process.env.SMTP_USER);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  if (!isMailConfigured()) {
    console.log("[Contact Route] Mail not configured, checking NODE_ENV");
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact Route] Development mode - returning simulated success");
      return res.status(200).json({
        message: "Email accepted in development mode (SMTP not configured).",
        simulated: true
      });
    }

    console.log("[Contact Route] Production mode without config - returning error");
    return res.status(500).json({ message: "Mailer is not configured on server." });
  }

  try {
    console.log("[Contact Route] Attempting to send email...");
    await sendContactEmail({ name, email, message });
    console.log("[Contact Route] Email sent successfully");
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log("[Contact Route] Error sending email:", error.message);
    return res.status(500).json({ message: "Unable to send email right now." });
  }
});

module.exports = router;
