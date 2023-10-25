// ! Express.js routes for customers
// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

<<<<<<< HEAD
const { AddNewCustomer,getCustomers,deleteCustomer } = require("../controllers/customerController");

Router.post("/customers", AddNewCustomer);
Router.get("/customers", getCustomers);
Router.get('/customers/delete', deleteCustomer);
=======
const {
  AddNewCustomer
  ,search,getbyid,
  CustomerProfile,
} = require("../controllers/customerController");
const { authenticateCustomer } = require("../middlewares/authenticateCustomer");

Router.post("/customers", AddNewCustomer);
Router.post("/customers/profile", authenticateCustomer, CustomerProfile);





Router.get("/customers/",search);
Router.get("/customers/:id",getbyid)

>>>>>>> 931696e7cec298c8599928ebde9e2196105011e9
module.exports = Router;



