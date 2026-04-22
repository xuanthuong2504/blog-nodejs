const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");
const usercontroller = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  ERROR_ID,
  ERROR_EMAIL,
  ERROR_PASS,
  ERROR_PASS_LENGTH,
  ERROR_NAME,
  ERROR_NAME_LENGHT,
} = require("../constants/msg.constants");
router.get(
  "/users/:id",
  [body("id").isInt().withMessage(ERROR_ID)],
  authenticateToken,
  usercontroller.getuserbyId,
);
router.post(
  "/users/login",
  [
    body("email").notEmpty().withMessage(ERROR_EMAIL),
    body("password").notEmpty().withMessage(ERROR_PASS),
  ],
  validationMiddleware,
  usercontroller.login,
);
router.post(
  "/users/register",
  [
    body("name")
      .notEmpty()
      .withMessage(ERROR_NAME)
      .isLength({ min: 3, max: 15 })
      .withMessage(ERROR_NAME_LENGHT),
    body("email").notEmpty().withMessage(ERROR_EMAIL),
    body("password")
      .notEmpty()
      .withMessage(ERROR_PASS)
      .isLength({ min: 6 })
      .withMessage(ERROR_PASS_LENGTH),
  ],
  validationMiddleware,
  usercontroller.register,
);

router.post("/users/logout", authenticateToken, usercontroller.logout);
router.post("/users/refreshtoken", usercontroller.refreshtoken);
router.patch(
  "/users/changepass",
  [
    body("oldpass")
      .notEmpty()
      .withMessage(ERROR_PASS)
      .isLength({ min: 6 })
      .withMessage(ERROR_PASS_LENGTH),
    body("newpass")
      .notEmpty()
      .withMessage(ERROR_PASS)
      .isLength({ min: 6 })
      .withMessage(ERROR_PASS_LENGTH),
  ],
  validationMiddleware,
  authenticateToken,
  usercontroller.changepass,
);
module.exports = router;
