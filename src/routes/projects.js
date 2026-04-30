const router = require("express").Router();
const { body } = require("express-validator");
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

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

// Public
router.get("/", getAllProjects);
router.get("/:id", getProject);

// Protected
router.post("/", protect, projectFields, projectValidation, createProject);
router.put("/:id", protect, projectFields, projectValidation, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
