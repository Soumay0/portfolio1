const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "portfolio-api" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  return res.status(200).json({ message: "Message received successfully." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // Keeps local development output explicit when both apps run in parallel.
  console.log(`Portfolio API running on http://localhost:${port}`);
});
