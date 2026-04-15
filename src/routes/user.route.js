const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");
const usercontroller = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
router.get("/users/:id", authenticateToken, usercontroller.getuserbyId);
router.post(
  "/users/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validationMiddleware,
  usercontroller.login,
);
router.post(
  "/users/register",
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
  usercontroller.register,
);

router.post("/users/logout", authenticateToken, usercontroller.logout);
router.post("/users/refreshtoken", usercontroller.refreshtoken);

module.exports = router;
