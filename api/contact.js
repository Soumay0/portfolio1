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

  return res.status(200).json({ message: "Message received successfully." });
};
