import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  await Admin.create({
    username: process.env.ADMIN_USERNAME || "admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  console.log("Admin created successfully.");
  process.exit(0);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
