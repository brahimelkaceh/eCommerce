// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const { AddNewCustomer } = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);

module.exports = Router;
