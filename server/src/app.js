const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const certificatesRouter = require("./routes/certificates");
const contactRouter = require("./routes/contact");
const healthRouter = require("./routes/health");
const projectsRouter = require("./routes/projects");

const app = express();

app.use(cors());
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
