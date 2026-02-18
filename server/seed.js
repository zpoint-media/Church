require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("./models/Content");
const User = require("./models/User");

const MONGO_URI =
  process.env.MONGODB_URI || "MONGODB_URI=mongodb+srv://kolade443_db_user:HeH1qUdbXnCUdIHQ@cluster0.xtnsgu0.mongodb.net/church-cms";

const seedData = [
  // ── HOME ──────────────────────────────────────────────────────────────
  {
    section: "home",
    home: {
      slides: [
        {
          subtitle: "Christ Holycross ✝",
          title: "YOUR CHURCH\nIS YOUR HOUSE",
          text: "We come to serving & believing God's Word and Spirit.",
          primaryBtn: "Donate",
          secondaryBtn: "About Us",
        },
        {
          subtitle: "Faith • Hope • Love",
          title: "GROW IN FAITH\nWALK IN TRUTH",
          text: "A place where the Word is alive and lives are transformed.",
          primaryBtn: "Join Us",
          secondaryBtn: "Sermons",
        },
        {
          subtitle: "Welcome Home",
          title: "A FAMILY\nBUILT ON CHRIST",
          text: "Experience worship, love, and spiritual growth together.",
          primaryBtn: "Visit Us",
          secondaryBtn: "Events",
        },
      ],
    },
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────
  {
    section: "about",
    about: {
      label: "About Us",
      heading: "Mafoluku Model Parish 1",
      description:
        "Mafoluku Model Parish 1 is a parish of the Celestial Church of Christ in Nigeria, devoted to the worship of the Almighty God through holiness, prayer, and obedience to the teachings of Jesus Christ.",
      readMoreLabel: "Read More",
      features: [
        {
          icon: "✛",
          title: "Glorify God",
          description:
            "We exist to glorify God in worship, prayer, and total submission to His divine will.",
        },
        {
          icon: "📖",
          title: "Believe the Holy Bible",
          description:
            "The Holy Bible is our foundation, guiding our faith, doctrine, and daily Christian living.",
        },
        {
          icon: "♥",
          title: "Love the Body of Christ",
          description:
            "We practice love, unity, and compassion as taught by Christ, serving one another in humility.",
        },
        {
          icon: "🙏",
          title: "Live a Holy Life",
          description:
            "We encourage a life of holiness, righteousness, and obedience, walking in the light of Christ.",
        },
      ],
    },
  },

  // ── EVENT HIGHLIGHT ───────────────────────────────────────────────────
  {
    section: "eventHighlight",
    eventHighlight: {
      upcomingEvent: {
        title: "Sunday Worship Service",
        time: "9:00 AM – 11:00 AM",
        location: "Main Sanctuary",
        description:
          "A powerful gathering of praise, prayer, and God's Word as we worship together as one family.",
      },
      latestSermon: {
        title: "Walking in Faith",
        pastor: "Pastor John Smith",
        date: "June 16, 2025",
        quote:
          "For we walk by faith, not by sight. In this sermon, Pastor John teaches how to trust God in all circumstances and walk confidently in His promises.",
        audioSrc: "/Wetin.mp3",
      },
    },
  },

  // ── SERMONS ───────────────────────────────────────────────────────────
  {
    section: "sermons",
    sermons: {
      sectionLabel: "Join Our Community",
      heading: "Recent Sermons",
      cards: [
        {
          category: "Faith & Trust",
          title: "Walking by Faith, Not by Sight",
          desc: "Learn how to trust God fully even when the path ahead is unclear and uncertain.",
          scripture: "2 Corinthians 5:7",
        },
        {
          category: "Prayer",
          title: "The Power of a Praying Church",
          desc: "Discover how united prayer brings revival, strength, and transformation.",
          scripture: "James 5:16",
        },
        {
          category: "Spiritual Growth",
          title: "Growing Deeper in Christ",
          desc: "A call to maturity, discipline, and consistency in your walk with God.",
          scripture: "Colossians 2:6–7",
        },
        {
          category: "Hope",
          title: "Hope That Never Fails",
          desc: "Even in dark times, God's promises remain sure and unchanging.",
          scripture: "Romans 15:13",
        },
        {
          category: "Purpose",
          title: "Created for a Purpose",
          desc: "Understand God's design for your life and walk confidently in your calling.",
          scripture: "Jeremiah 29:11",
        },
        {
          category: "Christian Living",
          title: "Living as Light in the World",
          desc: "Practical ways to reflect Christ's love in everyday life.",
          scripture: "Matthew 5:14–16",
        },
      ],
    },
  },

  // ── EVENTS GRID ───────────────────────────────────────────────────────
  {
    section: "eventsGrid",
    eventsGrid: {
      sectionLabel: "Join Our Community",
      heading: "Upcoming Events",
      events: [
        {
          date: "14",
          month: "May",
          year: "2025",
          time: "@ 8 to 11 AM",
          title: "Sharing Our Faith & Love",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
        {
          date: "15",
          month: "May",
          year: "2025",
          time: "@ 10 to 12 AM",
          title: "Faith and Fellowship",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
        {
          date: "16",
          month: "May",
          year: "2025",
          time: "@ 9 to 11 AM",
          title: "Community Outreach",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
        {
          date: "17",
          month: "May",
          year: "2025",
          time: "@ 8 to 10 AM",
          title: "Youth Gathering",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
        {
          date: "18",
          month: "May",
          year: "2025",
          time: "@ 11 to 1 PM",
          title: "Bible Study Group",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
        {
          date: "19",
          month: "May",
          year: "2025",
          time: "@ 7 to 9 AM",
          title: "Prayer Meeting",
          pastor: "Clinith Luis",
          address: "PO Box 16122 Collins Street.",
          image: "/Bible1.jpg",
        },
      ],
    },
  },

  // ── VERSE ─────────────────────────────────────────────────────────────
  {
    section: "verse",
    verse: {
      slides: [
        {
          title: "Verse Of The Day:",
          verse: "Heaven and earth will pass away, but my words will never pass away.",
          ref: "Matthew 24:35",
        },
        {
          title: "Verse Of The Day:",
          verse: "Peace I leave with you; my peace I give you.",
          ref: "John 14:27",
        },
        {
          title: "Verse Of The Day:",
          verse: "I am with you always, to the very end of the age.",
          ref: "Matthew 28:20",
        },
      ],
    },
  },

  // ── FOOTER ────────────────────────────────────────────────────────────
  {
    section: "footer",
    footer: {
      newsletterTitle: "Newsletter",
      newsletterDesc:
        "Stay connected with our community. Receive updates on services, events, and devotionals.",
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
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅  Connected to MongoDB");

  // Seed content
  for (const item of seedData) {
    await Content.findOneAndUpdate(
      { section: item.section },
      item,
      { upsert: true, new: true }
    );
    console.log(`  ✓  Seeded: ${item.section}`);
  }

  // Seed default admin user if none exists
  const count = await User.countDocuments();
  if (count === 0) {
    await User.create({
      email: process.env.ADMIN_EMAIL || "admin@church.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123",
      name: "Admin",
      role: "admin",
    });
    console.log("  ✓  Created default admin: admin@church.com / Admin@123");
  } else {
    console.log("  ℹ  Admin user already exists, skipping");
  }

  console.log("\n🎉  Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

  // ── ABOUT PAGE ────────────────────────────────────────────────────────
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
      missionParagraph1: "Our mission is to glorify God by making disciples through the teaching of God's Word, fervent prayer, and Christ-like living. We are committed to nurturing spiritual growth and empowering believers to fulfill God's purpose for their lives.",
      missionParagraph2: "We seek to build a loving church family where lives are transformed, hope is restored, and the power of the Holy Spirit is evident in every area of life.",
      valuesTitle: "Our Values",
      values: [
        { title: "Glorify God", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
        { title: "Believe the Bible", icon: "FaBookBible", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
        { title: "Love the Community", icon: "FiHeart", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
        { title: "Love People", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
        { title: "Christ-Centered Living", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
        { title: "Serve with Purpose", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
      ],
      quoteText: '<span class="text-amber-400 font-semibold">"Mafoluku Model Parish 1</span> is a church where prayer is a lifestyle, the Word of God is central, and love is lived out daily. We believe that lives are transformed through the power of the <span class="text-amber-400">Holy Spirit</span>, and that every believer is called to grow, serve, and walk faithfully with <span class="text-amber-400">God</span>."',
    },
  },

  // ── CONTACT PAGE ──────────────────────────────────────────────────────
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

  // ── SERMONS PAGE ──────────────────────────────────────────────────────
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
        { title: "Standing Firm", preacher: "Pastor Daniel Cole", date: "May 5, 2025", desc: "Remaining strong in faith during trials.", audio: "/audio/sermon7.mp3" },
        { title: "Grace That Saves", preacher: "Pastor Naomi Faith", date: "April 28, 2025", desc: "Understanding salvation through grace.", audio: "/audio/sermon8.mp3" },
        { title: "A Heart After God", preacher: "Pastor Samuel King", date: "April 21, 2025", desc: "Developing a heart that pleases God.", audio: "/audio/sermon9.mp3" },
        { title: "Victory Through Christ", preacher: "Pastor Grace Wilson", date: "April 14, 2025", desc: "Living victoriously through Jesus.", audio: "/Wetin.mp3" },
        { title: "Rooted in Christ", preacher: "Pastor Elijah Stone", date: "April 7, 2025", desc: "Staying spiritually grounded.", audio: "/audio/sermon11.mp3" },
        { title: "Walking in Love", preacher: "Pastor Rebecca Joy", date: "March 31, 2025", desc: "Living a life defined by love.", audio: "/audio/sermon12.mp3" },
      ],
    },
  },

  // ── EVENTS PAGE ───────────────────────────────────────────────────────
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
        { date: "17", month: "May", time: "@ 8 to 10 AM", title: "Youth Gathering", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
        { date: "18", month: "May", time: "@ 11 to 1 PM", title: "Bible Study Group", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
        { date: "19", month: "May", time: "@ 7 to 9 AM", title: "Prayer Meeting", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
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
