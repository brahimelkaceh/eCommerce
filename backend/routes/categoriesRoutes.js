// ! Express.js routes for categories
const express = require("express");
const Router = express.Router();

const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");

const ValidatorSanitizer = new validatorSanitizer();
const {
  searchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  showAllCategories,
  getCategoryById,
} = require("../controllers/categoriesController");

Router.get("/categories/search", TokenCheck, searchCategory);
Router.post("/categories", TokenCheck, ValidatorSanitizer.validate,createCategory);
Router.put("/categories/:id", TokenCheck, ValidatorSanitizer.validate,updateCategory);
Router.delete("/categories/:id", TokenCheck, deleteCategory);
Router.get("/categories/", TokenCheck, showAllCategories);
Router.get("/categories/:id", TokenCheck, getCategoryById);
module.exports = Router;
