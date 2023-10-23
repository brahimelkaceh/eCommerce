// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const {
  AddNewCustomer,
  signup,
  login,
  activate,
} = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/signup", signup);
Router.post("/customers/login", login);
Router.get("/customers/activate", activate);

module.exports = Router;
