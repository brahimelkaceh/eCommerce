// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const { AddNewCustomer,search,getbyid } = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);





Router.get("/customers/",search);
Router.get("/customers/:id",getbyid)

module.exports = Router;



