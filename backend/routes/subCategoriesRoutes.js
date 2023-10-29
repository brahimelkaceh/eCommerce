// ! Express.js routes for subcategories
const express = require("express");
const Router = express.Router();
const { TokenCheck } = require("../middlewares/TokenCheck");
const {
  createSubCategory,
  getAllSubcategories,
} = require("../controllers/subCategoriesController");

Router.post("/subcategories/", TokenCheck, createSubCategory);
Router.get("/subcategories/:categoryName", TokenCheck, getAllSubcategories);

module.exports = Router;
