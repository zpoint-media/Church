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
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowed = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "https://mafoluku1.netlify.app",
      "https://aafsuluku1.netlify.app",
    ];
    
    // Also allow any *.netlify.app subdomain
    if (allowed.includes(origin) || /\.netlify\.app$/.test(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error("Not allowed by CORS"));
  },
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

// ─── Auto Seed ───────────────────────────────────────────────────────────────
const Content = require("./models/Content");
const User    = require("./models/User");
const bcrypt  = require("bcryptjs");

async function autoSeed() {
  try {
    // Seed admin user if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        email: "admin@church.com",
        password: "Admin@123",
        name: "Admin",
        role: "admin",
      });
      console.log("  ✓  Admin created: admin@church.com / Admin@123");
    }

    // Seed content sections if they don't exist
    const contentCount = await Content.countDocuments();
    if (contentCount === 0) {
      const sections = [
        { section: "home", home: { slides: [{ subtitle: "Christ Holycross ✝", title: "YOUR CHURCH\nIS YOUR HOUSE", text: "We come to serving & believing God's Word and Spirit.", primaryBtn: "Donate", secondaryBtn: "About Us" }, { subtitle: "Faith • Hope • Love", title: "GROW IN FAITH\nWALK IN TRUTH", text: "A place where the Word is alive and lives are transformed.", primaryBtn: "Join Us", secondaryBtn: "Sermons" }, { subtitle: "Welcome Home", title: "A FAMILY\nBUILT ON CHRIST", text: "Experience worship, love, and spiritual growth together.", primaryBtn: "Visit Us", secondaryBtn: "Events" }] } },
        { section: "about", about: { label: "About Us", heading: "Mafoluku Model Parish 1", description: "Mafoluku Model Parish 1 is a parish of the Celestial Church of Christ in Nigeria, devoted to the worship of the Almighty God through holiness, prayer, and obedience to the teachings of Jesus Christ.", readMoreLabel: "Read More", features: [{ icon: "✛", title: "Glorify God", description: "We exist to glorify God in worship, prayer, and total submission to His divine will." }, { icon: "📖", title: "Believe the Holy Bible", description: "The Holy Bible is our foundation, guiding our faith, doctrine, and daily Christian living." }, { icon: "♥", title: "Love the Body of Christ", description: "We practice love, unity, and compassion as taught by Christ, serving one another in humility." }, { icon: "🙏", title: "Live a Holy Life", description: "We encourage a life of holiness, righteousness, and obedience, walking in the light of Christ." }] } },
        { section: "contactPage", contactPage: { heroTitle: "Contact Us", breadcrumbHome: "Home", breadcrumbCurrent: "Contact", sectionLabel: "Contact Us?", sectionHeading: "Get in Touch", formNamePlaceholder: "Full Name*", formEmailPlaceholder: "Email*", formSubjectPlaceholder: "Subject", formMessagePlaceholder: "Message", submitButtonText: "SEND NOW!", successMessage: "Message sent successfully!", errorMessage: "Failed to send message. Try again later." } },
        { section: "verse", verse: { slides: [{ title: "Verse Of The Day:", verse: "Heaven and earth will pass away, but my words will never pass away.", ref: "Matthew 24:35" }, { title: "Verse Of The Day:", verse: "Peace I leave with you; my peace I give you.", ref: "John 14:27" }, { title: "Verse Of The Day:", verse: "I am with you always, to the very end of the age.", ref: "Matthew 28:20" }] } },
        { section: "footer", footer: { newsletterTitle: "Newsletter", newsletterDesc: "Stay connected with our community.", newsletterCta: "Get Our Newsletter", copyrightName: "Grace Church", designerName: "T-Codes" } },
      ];
      for (const item of sections) {
        await Content.create(item);
      }
      console.log("  ✓  Default content seeded");
    }
  } catch (err) {
    console.error("  ⚠  Auto-seed error:", err.message);
  }
}

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/church-cms")
  .then(async () => {
    console.log("✅  MongoDB connected");
    await autoSeed();
    app.listen(PORT, () =>
      console.log(`🚀  Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  });
