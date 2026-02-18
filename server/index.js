require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes    = require("./routes/auth");
const contentRoutes = require("./routes/content");

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "http://localhost:4173",
    "https://mafoluku1.netlify.app",
    "https://aafsuluku1.netlify.app" // your Netlify URL
  ],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth",    authRoutes);
app.use("/api/content", contentRoutes);

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);

// ─── 404 catch-all — always return JSON, never HTML ──────────────────────────
app.use((_req, res) =>
  res.status(404).json({ message: "Route not found" })
);

// ─── Global error handler — always return JSON ───────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: err.message || "Internal server error" });
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/church-cms")
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀  Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  });
