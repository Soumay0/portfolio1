const mongoose = require("mongoose");

let isConnected = false;

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn("MONGODB_URI not set. Using in-memory fallback data.");
    return;
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB_NAME || "portfolio"
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed. Fallback data will be used.", error.message);
  }
}

module.exports = connectDatabase;
