// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();
const {
  AddNewCustomer,
  CustomerProfile,
} = require("../controllers/customerController");
const { authenticateCustomer } = require("../middlewares/authenticateCustomer");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/profile", authenticateCustomer, CustomerProfile);

module.exports = Router;
