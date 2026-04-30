import { validationResult } from "express-validator";
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

const publicIdFromUrl = (url) => {
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  const withVersion = parts[1];
  return withVersion.replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
};

const deleteFromCloudinary = async (url) => {
  const publicId = publicIdFromUrl(url);
  if (publicId) await cloudinary.uploader.destroy(publicId);
};

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
  } = req.body;

  if (!req.files?.image?.[0])
    return res.status(400).json({ message: "Cover image is required" });

  const image = req.files.image[0].path;
  const images = (req.files.images || []).map((f) => f.path);

  const project = await Project.create({
    title,
    description,
    longDescription,
    image,
    images,
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
};

const updateProject = async (req, res) => {
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
  } = req.body;

  if (req.files?.image?.[0]) {
    await deleteFromCloudinary(project.image);
    project.image = req.files.image[0].path;
  }

  if (req.files?.images?.length) {
    for (const url of project.images) await deleteFromCloudinary(url);
    project.images = req.files.images.map((f) => f.path);
  }

  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (longDescription !== undefined) project.longDescription = longDescription;
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
};

const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  await deleteFromCloudinary(project.image);
  for (const url of project.images) await deleteFromCloudinary(url);

  await project.deleteOne();
  res.json({ message: "Project deleted successfully" });
};

export { getAllProjects, getProject, createProject, updateProject, deleteProject };
