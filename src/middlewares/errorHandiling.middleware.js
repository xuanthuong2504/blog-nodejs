const { ERROR_500 } = require("../constants/msg.constants");
const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || ERROR_500;

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandlingMiddleware;
