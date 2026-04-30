import { Router } from "express";
import { body } from "express-validator";
import {
  sendMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const messageValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

router.post("/", messageValidation, sendMessage);
router.get("/", protect, getAllMessages);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
