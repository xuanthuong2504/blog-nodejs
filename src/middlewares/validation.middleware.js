const validator = require("express-validator");
const validationMiddleware = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = validationMiddleware;
