// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const Auth = require("../middlewares/Auth");

const {
  AddNewCustomer,
  signup,
  login,
  activate,
  getAllCustomers,
  getCustomerById,
  searchForCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/signup", signup);
Router.post("/customers/login", login);
Router.get("/customers/activate", activate);
Router.get("/customers/", getAllCustomers);
Router.get("/customers/search", searchForCustomer);
Router.get("/customers/:cid", getCustomerById);
Router.put(
  "/customers/update/:cid",
  Auth.authenticateJWT,
  Auth.restrictTo(["customer", "manager", "admin"]),
  updateCustomer,
);
Router.delete(
  "/customers/delete/:cid",
  Auth.authenticateJWT,
  Auth.restrictTo(["admin", "manager"]),
  deleteCustomer,
);

module.exports = Router;
