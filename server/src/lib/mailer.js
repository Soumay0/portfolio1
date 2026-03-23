const nodemailer = require("nodemailer");

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };
}

function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.EMAIL_TO
  );
}

async function sendContactEmail({ name, email, message }) {
  try {
    console.log("[Mailer] Attempting to send email...");
    console.log("[Mailer] Config check - Host:", process.env.SMTP_HOST, "Port:", process.env.SMTP_PORT);
    
    const transporter = nodemailer.createTransport(getSmtpConfig());

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `
    });
    
    console.log("[Mailer] Email sent successfully! Response:", info.response);
  } catch (error) {
    console.error("[Mailer] Error sending email:", error.message);
    throw error;
  }
}

module.exports = {
  isMailConfigured,
  sendContactEmail
};
