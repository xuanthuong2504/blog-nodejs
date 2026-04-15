const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = errorHandlingMiddleware;
