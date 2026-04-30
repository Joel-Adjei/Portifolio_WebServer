const router = require("express").Router();
const { body } = require("express-validator");
const { login, logout, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

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

module.exports = router;
