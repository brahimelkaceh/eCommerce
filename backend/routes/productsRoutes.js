// ! Express.js routes for products
const express = require("express");
const upload = require("../middlewares/multer");
const Router = express.Router();
const {
  createProduct,
  getAllProducts,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const validatorSanitizer = require("../middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
const { TokenCheck } = require("../middlewares/TokenCheck");
Router.post(
  "/products",
  TokenCheck,
  // ValidatorSanitizer.validate,
  upload.array("images", 5),
  createProduct,
);
Router.put(
  "/products/:id",
  TokenCheck,
  ValidatorSanitizer.validate,
  updateProduct,
);
Router.get("/products/", TokenCheck, getAllProducts);
Router.get("/products/search", TokenCheck, searchProducts);
Router.get("/products/:id", TokenCheck, getProductById);
Router.delete("/products/:id", TokenCheck, deleteProduct);

module.exports = Router;
