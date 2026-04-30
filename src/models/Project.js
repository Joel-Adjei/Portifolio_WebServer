const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    image: { type: String, required: true },          // Cloudinary URL
    images: [{ type: String }],                        // Additional Cloudinary URLs
    videoUrl: { type: String },
    technologies: [{ type: String, required: true }],
    date: { type: String, required: true },
    client: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["development", "design"], required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    behanceUrl: { type: String },
    previewUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
