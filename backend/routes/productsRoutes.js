// ! Express.js routes for products
const express = require("express");
// const upload = require("../middlewares/multer");
const multer = require("multer");
const upload = require("../middlewares/multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
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
  upload.array("images"),
  TokenCheck,
  createProduct
);
Router.put(
  "/products/:id",
  upload.array("images"),
  TokenCheck,
  updateProduct
);

// TokenCheck
Router.get("/products/", getAllProducts);
Router.get("/products/search", TokenCheck, searchProducts);
Router.get("/products/:id", TokenCheck, getProductById);
Router.delete("/products/:id", TokenCheck,deleteProduct);

module.exports = Router;
