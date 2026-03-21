module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  return res.status(200).json({ message: "Message received successfully." });
};
