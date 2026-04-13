const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
router.post(
  "/auth/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validationMiddleware,
  authController.login,
);
router.post(
  "/auth/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must be at least 3 characters"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validationMiddleware,
  authController.register,
);

router.post("/auth/logout", authenticateToken, authController.logout);
router.post("/auth/refreshtoken", authController.refreshtoken);

module.exports = router;
