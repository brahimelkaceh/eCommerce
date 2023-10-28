// ! Express.js routes for categories
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/categories/:categoryId', categoriesController.getCategoryById);

module.exports = router
