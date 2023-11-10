// ! Express.js routes for customers
// ! Express.js routes for users
const {CustomerTokenCheck} = require("../middlewares/CustomerTokenCheck")
const express = require("express");
const Router = express.Router();
const {TokenCheck} = require("../middlewares/TokenCheck")
//const Auth = require("../middlewares/Auth");
const validatorSanitizer = require("../middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
const upload = require("../middlewares/multer");

const {
  signup,
  login,
  activate,
  getAllCustomers,
  getCustomerById,
  searchForCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

Router.post(
  "/customers/signup",
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  signup,
);
Router.post("/customers/login", ValidatorSanitizer.validate, login);
Router.get("/customers/activate", activate);
Router.get("/customers/", TokenCheck, getAllCustomers);
Router.get("/customers/search",TokenCheck, searchForCustomer);
Router.get("/customers/:id",CustomerTokenCheck, getCustomerById);
Router.put(
  "/customers/:id",
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  TokenCheck,
  updateCustomer,
);
Router.delete("/customers/:id", TokenCheck, deleteCustomer);

module.exports = Router;
