// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const { AddNewCustomer,getCustomers,deleteCustomer } = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);
Router.get("/customers", getCustomers);
Router.get('/customers/delete', deleteCustomer);
module.exports = Router;
