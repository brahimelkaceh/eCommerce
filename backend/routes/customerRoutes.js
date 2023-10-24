// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const {
  AddNewCustomer,
  signup,
  login,
  activate,
  getAllCustomers,
  getCustomerById,
  search4Customer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/signup", signup);
Router.post("/customers/login", login);
Router.get("/customers/activate", activate);
Router.get("/customers/", getAllCustomers);
Router.get("/customers/search", search4Customer);
Router.get("/customers/:cid", getCustomerById);
Router.put("/customers/update/:cid", updateCustomer);
Router.delete("/customers/delete/:cid", deleteCustomer);

module.exports = Router;
