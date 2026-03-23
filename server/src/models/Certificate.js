const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
