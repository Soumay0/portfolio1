const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const certificatesRouter = require("./routes/certificates");
const contactRouter = require("./routes/contact");
const healthRouter = require("./routes/health");
const projectsRouter = require("./routes/projects");

const app = express();

// CORS Configuration - Allow Vercel frontend
const corsOptions = {
  origin: [
    "http://localhost:5173",        // Local dev
    "http://localhost:3000",         // Alternative local
    "https://yourdomain.vercel.app", // Replace with your actual Vercel URL
    "https://*.vercel.app"           // All Vercel deployments
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", healthRouter);
app.use("/contact", contactRouter);
app.use("/projects", projectsRouter);
app.use("/certificates", certificatesRouter);

app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/certificates", certificatesRouter);

module.exports = app;
