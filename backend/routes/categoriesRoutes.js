// ! Express.js routes for categories
const express = require("express");
const Router = express.Router();

const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");
const { ManagerTokenCheck } = require("../middlewares/ManagerTokenCheck");

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
Router.post(
  "/categories",
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  createCategory
);
Router.put(
  "/categories/:id",
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  updateCategory
);
Router.delete("/categories/:id", ManagerTokenCheck, deleteCategory);
Router.get("/categories/", showAllCategories);
Router.get("/categories/:id", getCategoryById);
module.exports = Router;
