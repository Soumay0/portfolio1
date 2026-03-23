const { isMailConfigured, sendContactEmail } = require("./_lib/mailer");

module.exports = (req, res) => {
  console.log("[Vercel API] /api/contact endpoint called");
  
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let payload = req.body || {};

  if (typeof req.body === "string") {
    try {
      payload = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON payload." });
    }
  }

  const { name, email, message } = payload;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[Vercel API] Email not configured, returning dev mode success");
      return res.status(200).json({
        message: "Email accepted in development mode (SMTP not configured).",
        simulated: true
      });
    }

    console.warn("[Vercel API] Email not configured in production");
    return res.status(500).json({ message: "Mailer is not configured on server." });
  }

  console.log("[Vercel API] Attempting to send contact email...");
  sendContactEmail({ name, email, message })
    .then(() => {
      console.log("[Vercel API] Contact email sent successfully");
      return res.status(200).json({ message: "Email sent successfully." });
    })
    .catch((error) => {
      console.error("[Vercel API] Error sending contact email:", error.message);
      return res.status(500).json({ message: "Unable to send email right now." });
    });
};
