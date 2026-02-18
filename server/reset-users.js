require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function reset() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    
    // Delete all users
    const deleted = await User.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} user(s)`);
    
    // Create fresh admin
    const admin = await User.create({
      email: "admin@church.com",
      password: "Admin@123",
      name: "Admin",
      role: "admin",
    });
    console.log("✅ New admin created:");
    console.log("   Email: admin@church.com");
    console.log("   Password: Admin@123");
    console.log(`   ID: ${admin._id}`);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

reset();
