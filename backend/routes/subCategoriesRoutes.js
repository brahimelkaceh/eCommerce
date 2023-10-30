// ! Express.js routes for subcategories
const express = require('express');
const Router = express.Router();
const { createSubCategory } = require('../controllers/subCategoriesController');
const validatorSanitizer = require("../middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
//const { TokenCheck } = require('../middlewares/TokenCheck');

Router.post('/subcategories',ValidatorSanitizer.validate,createSubCategory);













module.exports = Router;