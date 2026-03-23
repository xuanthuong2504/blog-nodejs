const express = require("express");
const router = express.Router();
const { param, body, validationResult } = require("express-validator");
const category = require("../controllers/category.Controller");
router.get("/categories/:id", category.getCategoryById);
router.get("/categories", category.getAll);
router.post(
  "/categories",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must be at least 3 characters"),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 10 })
      .withMessage("Description too long"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
  category.create,
);
router.put(
  "/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
  category.edit,
);
router.delete("/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
  category.remove
);
module.exports = router;
