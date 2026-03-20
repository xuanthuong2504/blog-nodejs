/*
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};*/
const errorHandlingMiddleware = (err, req, res, next) => {
   
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  };
  

module.exports = errorHandlingMiddleware;