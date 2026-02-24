const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../src/models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with email: admin@test.com");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    console.log("Email: admin@test.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
