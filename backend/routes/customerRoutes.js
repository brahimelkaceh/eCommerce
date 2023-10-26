// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const {
  AddNewCustomer,
  search,
  getbyid,
  CustomerProfile,
} = require("../controllers/customerController");
const { authenticateCustomer } = require("../middlewares/authenticateCustomer");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/profile", authenticateCustomer, CustomerProfile);

Router.get("/customers/", search);
Router.get("/customers/:id", getbyid);

module.exports = Router;
