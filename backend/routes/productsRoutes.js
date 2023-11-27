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
const { ManagerTokenCheck } = require("../middlewares/ManagerTokenCheck");

Router.post(
  "/products",
  upload.array("images"),
  ManagerTokenCheck,
  createProduct
);
Router.put(
  "/products/:id",
  upload.array("images"),
  ManagerTokenCheck,
  updateProduct
);

// TokenCheck
Router.get("/products/", ManagerTokenCheck, getAllProducts);
Router.get("/products/search", ManagerTokenCheck, searchProducts);
Router.get("/products/:id", ManagerTokenCheck, getProductById);
Router.delete("/products/:id", ManagerTokenCheck, deleteProduct);

module.exports = Router;
