import { Router } from "express";
import { body } from "express-validator";
import { login, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  login
);

router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
