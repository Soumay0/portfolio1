const { fallbackCertificates } = require("./_lib/fallbackData");
const { getDatabase } = require("./_lib/mongo");

module.exports = async (req, res) => {
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
        return res.status(200).json({ data: certificates, source: "mongodb" });
      }
    }

    return res.status(200).json({ data: fallbackCertificates, source: "fallback" });
  } catch (error) {
    return res.status(200).json({ data: fallbackCertificates, source: "fallback" });
  }
};
