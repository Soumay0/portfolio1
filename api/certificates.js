const { fallbackCertificates } = require("./_lib/fallbackData");
const { getDatabase } = require("./_lib/mongo");

module.exports = async (req, res) => {
  console.log("[Vercel API] /api/certificates endpoint called");
  
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await getDatabase();

    if (db) {
      const certificates = await db
        .collection("certificates")
        .find({})
        .sort({ updatedAt: -1 })
        .toArray();

      if (certificates.length > 0) {
        console.log("[Vercel API] Found certificates in MongoDB:", certificates.length);
        return res.status(200).json({ data: certificates, source: "mongodb" });
      }
    }

    console.log("[Vercel API] Using fallback certificates");
    return res.status(200).json({ data: fallbackCertificates, source: "fallback" });
  } catch (error) {
    console.error("[Vercel API] Error:", error.message);
    return res.status(200).json({ data: fallbackCertificates, source: "fallback-error" });
  }
};
