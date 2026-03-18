const express = require('express');
const router = express.Router();

const categoriesController= require('../controllers/CategoryController');
router.get('/categories/:id',categoriesController.getCategoryById);
router.get('/categories',categoriesController.getAll);
router.post('/categories',categoriesController.create);
router.put('/categories/:id',categoriesController.edit);
router.delete('/categories/:id',categoriesController.remove);
module.exports= router;