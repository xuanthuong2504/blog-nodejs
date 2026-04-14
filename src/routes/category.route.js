const express = require("express");
const router = express.Router();
const { query, param, body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");
const category = require("../controllers/category.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const resizeimage = require("../middlewares/resize.middleware");

router.get(
  "/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  validationMiddleware,
  authenticateToken,
  category.getCategoryById,
);
router.get(
  "/categories",
  [
    query("offset").optional().isInt().withMessage("Offset must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
  ],
  validationMiddleware,
  authenticateToken,
  category.getAll,
);
router.post(
  "/categories",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || "Upload image failed",
        });
      }
      next();
    });
  },
  resizeimage,
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must be at least 3 characters"),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 30 })
      .withMessage("Description too long"),
  ],
  validationMiddleware,
  authenticateToken,
  category.create,
);
router.put(
  "/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  validationMiddleware,
  authenticateToken,
  category.edit,
);
router.delete(
  "/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  validationMiddleware,
  authenticateToken,
  category.remove,
);
router.patch(
  "/categories/:id",
  [param("id").isInt().withMessage("Id must be an integer")],
  validationMiddleware,
  authenticateToken,
  category.removeimage,
);

module.exports = router;
