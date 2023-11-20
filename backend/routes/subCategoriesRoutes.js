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
  searchSubCategory,
} = require("../controllers/subCategoriesController");

Router.post(
  "/subcategories/",
  TokenCheck,
  ValidatorSanitizer.validate,
  createSubCategory
);
Router.get("/subcategories/search", searchSubCategory);
Router.get("/subcategories/", getAllSubcategories);
Router.get("/subcategories/:id", getSubCategoryById);
Router.put(
  "/subcategories/:id",
  ValidatorSanitizer.validate,
  updateSubCategory
);
Router.delete("/subcategories/:id", deleteSubCategory);

module.exports = Router;
