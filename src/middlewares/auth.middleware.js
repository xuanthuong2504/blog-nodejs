const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  ERROR_TOKEN,
  ERROR_TOKEN_VERIFY,
} = require("../constants/msg.constants");
const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      const err = new Error(ERROR_TOKEN);
      err.statusCode = 401;
      throw err;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        const err = new Error(ERROR_TOKEN_VERIFY);
        err.statusCode = 403;
        throw err;
      }
      req.user = user;
      // console.log("User in middleware:", req.user);
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateToken;
