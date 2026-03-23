const { fallbackProjects } = require("./_lib/fallbackData");
const { getDatabase } = require("./_lib/mongo");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await getDatabase();

    if (db) {
      const projects = await db.collection("projects").find({}).sort({ updatedAt: -1 }).toArray();
      if (projects.length > 0) {
        return res.status(200).json({ data: projects, source: "mongodb" });
      }
    }

    return res.status(200).json({ data: fallbackProjects, source: "fallback" });
  } catch (error) {
    return res.status(200).json({ data: fallbackProjects, source: "fallback" });
  }
};
