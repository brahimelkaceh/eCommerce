// ! Express.js routes for subcategories
const express = require("express");
const Router = express.Router();
const { TokenCheck } = require("../middlewares/TokenCheck");
const {
  createSubCategory,
  getAllSubcategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
} = require("../controllers/subCategoriesController");

Router.post("/subcategories/", TokenCheck, createSubCategory);
Router.get("/subcategories/", TokenCheck, getAllSubcategories);
Router.get("/subcategories/:id", TokenCheck, getSubCategoryById);
Router.put("/subcategories/:id", TokenCheck, updateSubCategory);
Router.delete("/subcategories/:id", TokenCheck, deleteSubCategory);

module.exports = Router;
