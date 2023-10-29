// ! Express.js routes for categories
const express = require("express");
const Router = express.Router();
const { TokenCheck } = require("../middlewares/TokenCheck");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoriesController");

Router.post("/categories/", TokenCheck, createCategory);
Router.get("/categories/", TokenCheck, getAllCategories);

module.exports = Router;
