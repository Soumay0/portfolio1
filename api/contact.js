const { isMailConfigured, sendContactEmail } = require("./_lib/mailer");

module.exports = (req, res) => {
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
      return res.status(200).json({
        message: "Email accepted in development mode (SMTP not configured).",
        simulated: true
      });
    }

    return res.status(500).json({ message: "Mailer is not configured on server." });
  }

  sendContactEmail({ name, email, message })
    .then(() => res.status(200).json({ message: "Email sent successfully." }))
    .catch(() => res.status(500).json({ message: "Unable to send email right now." }));
};
