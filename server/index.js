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
    if (!origin) return callback(null, true);

    const allowed = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "https://mafoluku.netlify.app",
      "https://aafsuluku1.netlify.app",
    ];

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

async function autoSeed() {
  try {
    // Seed admin user if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        email: process.env.ADMIN_EMAIL || "admin@church.com",
        password: process.env.ADMIN_PASSWORD || "Admin@123",
        name: "Admin",
        role: "admin",
      });
      console.log("  ✓  Admin created:", process.env.ADMIN_EMAIL || "admin@church.com");
    } else {
      console.log("  ℹ  Admin user already exists, skipping");
    }

    // Seed content sections if they don't exist
    const contentCount = await Content.countDocuments();
    if (contentCount === 0) {
      const sections = [
        {
          section: "home",
          home: {
            slides: [
              { subtitle: "Christ Holycross ✝", title: "YOUR CHURCH\nIS YOUR HOUSE", text: "We come to serving & believing God's Word and Spirit.", primaryBtn: "Donate", secondaryBtn: "About Us" },
              { subtitle: "Faith • Hope • Love", title: "GROW IN FAITH\nWALK IN TRUTH", text: "A place where the Word is alive and lives are transformed.", primaryBtn: "Join Us", secondaryBtn: "Sermons" },
              { subtitle: "Welcome Home", title: "A FAMILY\nBUILT ON CHRIST", text: "Experience worship, love, and spiritual growth together.", primaryBtn: "Visit Us", secondaryBtn: "Events" },
            ],
          },
        },
        {
          section: "about",
          about: {
            label: "About Us",
            heading: "Mafoluku Model Parish 1",
            description: "Mafoluku Model Parish 1 is a parish of the Celestial Church of Christ in Nigeria, devoted to the worship of the Almighty God through holiness, prayer, and obedience to the teachings of Jesus Christ.",
            readMoreLabel: "Read More",
            features: [
              { icon: "✛", title: "Glorify God", description: "We exist to glorify God in worship, prayer, and total submission to His divine will." },
              { icon: "📖", title: "Believe the Holy Bible", description: "The Holy Bible is our foundation, guiding our faith, doctrine, and daily Christian living." },
              { icon: "♥", title: "Love the Body of Christ", description: "We practice love, unity, and compassion as taught by Christ, serving one another in humility." },
              { icon: "🙏", title: "Live a Holy Life", description: "We encourage a life of holiness, righteousness, and obedience, walking in the light of Christ." },
            ],
          },
        },
        {
          section: "eventHighlight",
          eventHighlight: {
            upcomingEvent: {
              title: "Sunday Worship Service",
              time: "9:00 AM – 11:00 AM",
              location: "Main Sanctuary",
              description: "A powerful gathering of praise, prayer, and God's Word as we worship together as one family.",
            },
            latestSermon: {
              title: "Walking in Faith",
              pastor: "Pastor John Smith",
              date: "June 16, 2025",
              quote: "For we walk by faith, not by sight. In this sermon, Pastor John teaches how to trust God in all circumstances and walk confidently in His promises.",
              audioSrc: "/Wetin.mp3",
            },
          },
        },
        {
          section: "sermons",
          sermons: {
            sectionLabel: "Join Our Community",
            heading: "Recent Sermons",
            cards: [
              { category: "Faith & Trust", title: "Walking by Faith, Not by Sight", desc: "Learn how to trust God fully even when the path ahead is unclear and uncertain.", scripture: "2 Corinthians 5:7" },
              { category: "Prayer", title: "The Power of a Praying Church", desc: "Discover how united prayer brings revival, strength, and transformation.", scripture: "James 5:16" },
              { category: "Spiritual Growth", title: "Growing Deeper in Christ", desc: "A call to maturity, discipline, and consistency in your walk with God.", scripture: "Colossians 2:6–7" },
              { category: "Hope", title: "Hope That Never Fails", desc: "Even in dark times, God's promises remain sure and unchanging.", scripture: "Romans 15:13" },
              { category: "Purpose", title: "Created for a Purpose", desc: "Understand God's design for your life and walk confidently in your calling.", scripture: "Jeremiah 29:11" },
              { category: "Christian Living", title: "Living as Light in the World", desc: "Practical ways to reflect Christ's love in everyday life.", scripture: "Matthew 5:14–16" },
            ],
          },
        },
        {
          section: "eventsGrid",
          eventsGrid: {
            sectionLabel: "Join Our Community",
            heading: "Upcoming Events",
            events: [
              { date: "14", month: "May", year: "2025", time: "@ 8 to 11 AM", title: "Sharing Our Faith & Love", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "15", month: "May", year: "2025", time: "@ 10 to 12 AM", title: "Faith and Fellowship", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "16", month: "May", year: "2025", time: "@ 9 to 11 AM", title: "Community Outreach", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "17", month: "May", year: "2025", time: "@ 8 to 10 AM", title: "Youth Gathering", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "18", month: "May", year: "2025", time: "@ 11 to 1 PM", title: "Bible Study Group", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "19", month: "May", year: "2025", time: "@ 7 to 9 AM", title: "Prayer Meeting", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
            ],
          },
        },
        {
          section: "verse",
          verse: {
            slides: [
              { title: "Verse Of The Day:", verse: "Heaven and earth will pass away, but my words will never pass away.", ref: "Matthew 24:35" },
              { title: "Verse Of The Day:", verse: "Peace I leave with you; my peace I give you.", ref: "John 14:27" },
              { title: "Verse Of The Day:", verse: "I am with you always, to the very end of the age.", ref: "Matthew 28:20" },
            ],
          },
        },
        {
          section: "footer",
          footer: {
            newsletterTitle: "Newsletter",
            newsletterDesc: "Stay connected with our community. Receive updates on services, events, and devotionals.",
            newsletterCta: "Get Our Newsletter",
            latestNewsTitle: "Latest News",
            latestNewsItems: [
              { title: "Lord of our life & our salvation", date: "12 May 2025" },
              { title: "Community outreach this weekend", date: "8 May 2025" },
            ],
            usefulLinks: [
              { label: "Who we are?" },
              { label: "Support and FAQ's" },
              { label: "Payments" },
              { label: "Donations Terms" },
              { label: "Volunteer" },
            ],
            socialLinks: [
              { name: "Facebook", href: "https://facebook.com" },
              { name: "Whatsapp", href: "https://wa.me" },
              { name: "Youtube", href: "#" },
              { name: "Gmail", href: "mailto:church@email.com" },
              { name: "Instagram", href: "https://instagram.com" },
            ],
            copyrightName: "Grace Church",
            designerName: "T-Codes",
          },
        },
        {
          section: "aboutPage",
          aboutPage: {
            heroTitle: "About Us",
            breadcrumbHome: "Home",
            breadcrumbCurrent: "About Us",
            introLabel: "About Us",
            introHeading: "Welcome to Mafoluku Model Parish 1",
            historyTitle: "Brief From History",
            historyParagraph1: "Mafoluku Model Parish 1 was established with a clear vision to raise a people rooted in faith, truth, and love. From humble beginnings, the church has grown into a vibrant family of believers committed to worship, discipleship, and service.",
            historyParagraph2: "Over the years, the parish has remained steadfast in preaching the undiluted Word of God while responding to the spiritual and practical needs of the community through prayer, outreach, and compassionate service.",
            missionTitle: "Our Mission",
            missionParagraph1: "Our mission is to glorify God by making disciples through the teaching of God's Word, fervent prayer, and Christ-like living.",
            missionParagraph2: "We seek to build a loving church family where lives are transformed, hope is restored, and the power of the Holy Spirit is evident in every area of life.",
            valuesTitle: "Our Values",
            values: [
              { title: "Glorify God", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God." },
              { title: "Believe the Bible", icon: "FaBookBible", description: "We uphold this value as a core part of our faith and daily walk with God." },
              { title: "Love the Community", icon: "FiHeart", description: "We uphold this value as a core part of our faith and daily walk with God." },
              { title: "Love People", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God." },
              { title: "Christ-Centered Living", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God." },
              { title: "Serve with Purpose", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God." },
            ],
          },
        },
        {
          section: "contactPage",
          contactPage: {
            heroTitle: "Contact Us",
            breadcrumbHome: "Home",
            breadcrumbCurrent: "Contact",
            sectionLabel: "Contact Us?",
            sectionHeading: "Get in Touch",
            formNamePlaceholder: "Full Name*",
            formEmailPlaceholder: "Email*",
            formSubjectPlaceholder: "Subject",
            formMessagePlaceholder: "Message",
            submitButtonText: "SEND NOW!",
            successMessage: "Message sent successfully!",
            errorMessage: "Failed to send message. Try again later.",
          },
        },
        {
          section: "sermonsPage",
          sermonsPage: {
            heroTitle: "Church Sermons",
            breadcrumbHome: "Home",
            breadcrumbCurrent: "Sermons",
            sectionLabel: "Join Us",
            sectionHeading: "Recent Sermons",
            sermons: [
              { title: "Walking in Faith", preacher: "Pastor John Smith", date: "June 16, 2025", desc: "Learning to trust God even when the path is unclear.", audio: "/Wetin.mp3" },
              { title: "The Power of Prayer", preacher: "Pastor Ruth Daniels", date: "June 9, 2025", desc: "Understanding how prayer changes lives and situations.", audio: "/audio/sermon2.mp3" },
              { title: "Hope That Never Fails", preacher: "Pastor Michael Cole", date: "June 2, 2025", desc: "God's promises remain sure in every season.", audio: "/audio/sermon3.mp3" },
              { title: "Living as Light", preacher: "Pastor Emmanuel Grace", date: "May 26, 2025", desc: "How believers shine Christ's light in the world.", audio: "/audio/sermon4.mp3" },
              { title: "Created With Purpose", preacher: "Pastor James Ade", date: "May 19, 2025", desc: "Discovering God's divine purpose for your life.", audio: "/audio/sermon5.mp3" },
              { title: "Faith Over Fear", preacher: "Pastor Sarah Johnson", date: "May 12, 2025", desc: "Choosing faith instead of fear in difficult times.", audio: "/audio/sermon6.mp3" },
            ],
          },
        },
        {
          section: "eventsPage",
          eventsPage: {
            heroTitle: "Events",
            breadcrumbHome: "Home",
            breadcrumbCurrent: "Events",
            sectionLabel: "Join Us",
            sectionHeading: "Upcoming Events",
            events: [
              { date: "14", month: "May", time: "@ 8 to 11 AM", title: "Sharing Our Faith & Love", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "15", month: "May", time: "@ 10 to 12 AM", title: "Faith and Fellowship", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
              { date: "16", month: "May", time: "@ 9 to 11 AM", title: "Community Outreach", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
            ],
            upcomingSermonsLabel: "Join Our Community",
            upcomingSermonsHeading: "Upcoming Sermons",
            upcomingSermons: [
              { date: "June 2, 2025", category: "Faith & Trust", title: "Walking by Faith, Not by Sight", desc: "Learn how to trust God fully even when the path ahead is unclear.", author: "Pastor Michael" },
              { date: "June 9, 2025", category: "Prayer", title: "The Power of a Praying Church", desc: "Discover how united prayer brings revival and strength.", author: "Pastor Ruth" },
              { date: "June 16, 2025", category: "Spiritual Growth", title: "Growing Deeper in Christ", desc: "A call to maturity and consistency in your walk with God.", author: "Pastor Daniel" },
            ],
          },
        },
      ];

      for (const item of sections) {
        await Content.create(item);
      }
      console.log("  ✓  Default content seeded");
    } else {
      console.log("  ℹ  Content already exists, skipping");
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