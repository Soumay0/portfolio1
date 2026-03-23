const { MongoClient } = require("mongodb");

let cachedClient;

async function getDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  const dbName = process.env.MONGODB_DB_NAME || "portfolio";
  return cachedClient.db(dbName);
}

module.exports = {
  getDatabase
};
