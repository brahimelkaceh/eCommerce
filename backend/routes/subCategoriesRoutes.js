// ! Express.js routes for subcategories
const express = require('express');
const router = express.Router();
const subCategoriesController = require('../controllers/subCategoriesController');

router.get('/subcategories/:subcategoryId', subCategoriesController.getSubcategoryById);

module.exports = router;
