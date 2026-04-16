const express = require("express");
const router = express.Router();
const { query, param, body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");
const category = require("../controllers/category.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const resizeimage = require("../middlewares/resize.middleware");
const {
  ERROR_ID,
  ERROR_OFFSET,
  ERROR_LIMIT,
  ERROR_NAME,
  ERROR_NAME_LENGHT,
  ERROR_DESCRIPTION,
  ERROR_DESCRIPTION_LENGHT,
  ERROR_IMAGE_FALSE,
} = require("../constants/msg.constants");

router.get(
  "/categories/:id",
  [param("id").isInt().withMessage(ERROR_ID)],
  validationMiddleware,
  authenticateToken,
  category.getCategoryById,
);
router.get(
  "/categories",
  [
    query("offset").optional().isInt().withMessage(ERROR_OFFSET),
    query("limit").optional().isInt().withMessage(ERROR_LIMIT),
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
          message: err.message || ERROR_IMAGE_FALSE,
        });
      }
      next();
    });
  },
  resizeimage,
  [
    body("name")
      .notEmpty()
      .withMessage(ERROR_NAME)
      .isLength({ min: 3, max: 15 })
      .withMessage(ERROR_NAME_LENGHT),

    body("description")
      .notEmpty()
      .withMessage(ERROR_DESCRIPTION)
      .isLength({ max: 30 })
      .withMessage(ERROR_DESCRIPTION_LENGHT),
  ],
  validationMiddleware,
  authenticateToken,
  category.create,
);
router.put(
  "/categories/:id",
  [param("id").isInt().withMessage(ERROR_ID)],
  validationMiddleware,
  authenticateToken,
  category.edit,
);
router.delete(
  "/categories/:id",
  [param("id").isInt().withMessage(ERROR_ID)],
  validationMiddleware,
  authenticateToken,
  category.remove,
);
router.patch(
  "/categories/:id",
  [param("id").isInt().withMessage(ERROR_ID)],
  validationMiddleware,
  authenticateToken,
  category.removeimage,
);

module.exports = router;
