import { Router } from "express";
import { body } from "express-validator";
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

const projectFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const projectValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("longDescription").notEmpty().withMessage("Long description is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("client").notEmpty().withMessage("Client is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("type")
    .isIn(["development", "design"])
    .withMessage("Type must be development or design"),
];

router.get("/", getAllProjects);
router.get("/:id", getProject);

router.post("/", protect, projectFields, projectValidation, createProject);
router.put("/:id", protect, projectFields, projectValidation, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
