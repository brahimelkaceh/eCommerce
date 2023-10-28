// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const Auth = require("../middlewares/Auth");

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

Router.post("/customers/signup", signup);
Router.post("/customers/login", login);
Router.get("/customers/activate", activate);
Router.get("/customers/", getAllCustomers);
Router.get("/customers/", searchForCustomer);
Router.get("/customers/:id", getCustomerById);
Router.put(
  "/customers/:id",
  Auth.authenticateJWT,
  // Auth.restrictTo(["customer", "manager", "admin"]),
  updateCustomer
);
Router.delete(
  "/customers/:id",
  Auth.authenticateJWT,
  // Auth.restrictTo(["customer", "manager", "admin"]),
  deleteCustomer
);

module.exports = Router;
