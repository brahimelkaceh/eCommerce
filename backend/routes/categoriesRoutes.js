// ! Express.js routes for categories
const express = require('express');
const Router = express.Router();
const { createCategory } = require('../controllers/categoriesController');
const validatorSanitizer = require("../middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
//const { TokenCheck } = require('../middlewares/TokenCheck');

Router.post('/categories',ValidatorSanitizer.validate,createCategory);













module.exports = Router;