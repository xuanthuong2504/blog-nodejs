const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  ERROR_TOKEN,
  ERROR_TOKEN_VERIFY,
} = require("../constants/msg.constants");
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    const err = new Error(ERROR_TOKEN);
    err.statusCode = 401;
    throw err;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    const err = new Error(ERROR_TOKEN_VERIFY);
    err.statusCode = 403;
    console.log(err.message);
    return next(err);
  }
};

module.exports = authenticateToken;
