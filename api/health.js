module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  console.log("[Vercel API] Health check called");
  res.status(200).json({ status: "ok", service: "portfolio-api" });
};
