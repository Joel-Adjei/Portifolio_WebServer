import { validationResult } from "express-validator";
import Project from "../models/Project.js";
// import cloudinary from "../config/cloudinary.js";

// const publicIdFromUrl = (url) => {
//   const parts = url.split("/upload/");
//   if (parts.length < 2) return null;
//   const withVersion = parts[1];
//   return withVersion.replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
// };

// const deleteFromCloudinary = async (url) => {
//   const publicId = publicIdFromUrl(url);
//   if (publicId) await cloudinary.v2.uploader.destroy(publicId);
// };

const getAllProjects = async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ projects });
};

const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ project });
};

const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      description,
      longDescription,
      technologies,
      date,
      client,
      category,
      type,
      githubUrl,
      liveUrl,
      behanceUrl,
      previewUrl,
      videoUrl,
      image,
      images,
    } = req.body;

    if (!image)
      return res.status(400).json({ message: "Cover image URL is required" });

    const project = await Project.create({
      title,
      description,
      longDescription,
      image,
      images: images || [],
      videoUrl,
      technologies: Array.isArray(technologies)
        ? technologies
        : technologies.split(",").map((t) => t.trim()),
      date,
      client,
      category,
      type,
      githubUrl,
      liveUrl,
      behanceUrl,
      previewUrl,
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const {
      title,
      description,
      longDescription,
      technologies,
      date,
      client,
      category,
      type,
      githubUrl,
      liveUrl,
      behanceUrl,
      previewUrl,
      videoUrl,
      image,
      images,
    } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (longDescription !== undefined)
      project.longDescription = longDescription;
    if (image !== undefined) project.image = image;
    if (images !== undefined) project.images = images;
    if (technologies !== undefined)
      project.technologies = Array.isArray(technologies)
        ? technologies
        : technologies.split(",").map((t) => t.trim());
    if (date !== undefined) project.date = date;
    if (client !== undefined) project.client = client;
    if (category !== undefined) project.category = category;
    if (type !== undefined) project.type = type;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (behanceUrl !== undefined) project.behanceUrl = behanceUrl;
    if (previewUrl !== undefined) project.previewUrl = previewUrl;
    if (videoUrl !== undefined) project.videoUrl = videoUrl;

    await project.save();
    res.json({ project });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
