// ! Express.js routes for categories
const express = require("express");
const Router = express.Router();


const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");

const ValidatorSanitizer = new validatorSanitizer();
 const {searchCategory , createCategory,updateCategory,deleteCategory,showAllCategories,getCategoryById}=require('../controllers/categoriesController')











Router.get("/categories", searchCategory) 
Router.post("/categories",createCategory)
Router.patch("/categories/:id",updateCategory)
Router.delete("/categories/:id",deleteCategory)
Router.get("/categories/allCategories",showAllCategories)
Router.get("/categories/:id",getCategoryById)
module.exports = Router;
