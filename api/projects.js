const { fallbackProjects } = require("./_lib/fallbackData");
const { getDatabase } = require("./_lib/mongo");

module.exports = async (req, res) => {
  console.log("[Vercel API] /api/projects endpoint called");
  console.log("[Vercel API] Method:", req.method);
  
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
    console.log("[Vercel API] Attempting to connect to MongoDB...");
    const db = await getDatabase();

    if (db) {
      console.log("[Vercel API] Connected to MongoDB, fetching projects...");
      const projects = await db.collection("projects").find({}).sort({ updatedAt: -1 }).toArray();
      if (projects.length > 0) {
        console.log("[Vercel API] Found projects in MongoDB:", projects.length);
        return res.status(200).json({ data: projects, source: "mongodb" });
      }
    }

    console.log("[Vercel API] Using fallback projects");
    return res.status(200).json({ data: fallbackProjects, source: "fallback" });
  } catch (error) {
    console.error("[Vercel API] Error:", error.message);
    console.log("[Vercel API] Fallback on error");
    return res.status(200).json({ data: fallbackProjects, source: "fallback-error" });
  }
};
