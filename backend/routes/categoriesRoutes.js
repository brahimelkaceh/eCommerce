// ! Express.js routes for categories
const express = require("express");
const Router = express.Router();
<<<<<<< HEAD
const { TokenCheck } = require("../middlewares/TokenCheck");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categoriesController");

Router.post("/categories/", TokenCheck, createCategory);
Router.get("/categories/", TokenCheck, getAllCategories);

Router.get("/categories/:id", getCategoryById);

=======


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
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
module.exports = Router;
