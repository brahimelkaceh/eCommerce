// ! Express.js routes for subcategories
const express = require("express");
const Router = express.Router();


const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");

const ValidatorSanitizer = new validatorSanitizer();
 const {searchSubCategory , createSubCategory}=require('../controllers/subCategoriesController')











Router.get("/subCategories", searchSubCategory) 
Router.post("/subCategories", createSubCategory) 

module.exports = Router;