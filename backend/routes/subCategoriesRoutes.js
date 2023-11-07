// ! Express.js routes for subcategories
const express = require("express");
const Router = express.Router();
const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");
const ValidatorSanitizer = new validatorSanitizer();
const {
  createSubCategory,
  getAllSubcategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  searchSubCategory
} = require("../controllers/subCategoriesController");

Router.post("/subcategories/", TokenCheck, ValidatorSanitizer.validate, createSubCategory);
Router.get("/subcategories/search", TokenCheck, searchSubCategory);
Router.get("/subcategories/", TokenCheck, getAllSubcategories);
Router.get("/subcategories/:id", TokenCheck, getSubCategoryById);
Router.put("/subcategories/:id", TokenCheck,ValidatorSanitizer.validate,updateSubCategory);
Router.delete("/subcategories/:id", TokenCheck, deleteSubCategory);

module.exports = Router;
