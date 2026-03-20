const {body }= require('express-validator');

const CategoryValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('description')
        .optional()
        .isLength({ max: 255 }).withMessage('Description too long')
];

module.exports = 
    CategoryValidator;
