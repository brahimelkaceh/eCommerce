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
const { ManagerTokenCheck } = require("../middlewares/ManagerTokenCheck");

Router.post(
  "/subcategories/",
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  createSubCategory
);
Router.get("/subcategories/search", searchSubCategory);
Router.get("/subcategories/", ManagerTokenCheck, getAllSubcategories);
Router.get("/subcategories/:id", ManagerTokenCheck, getSubCategoryById);
Router.put(
  "/subcategories/:id",
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  updateSubCategory
);
Router.delete("/subcategories/:id", ManagerTokenCheck, deleteSubCategory);

module.exports = Router;
