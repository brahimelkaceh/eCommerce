// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const CONSTANTS = require('../config/constants');


// create the customer account 
exports.AddNewCustomer = catchAsync(async (req, res) => {
  const response = {};
  try {
    const newCustomer = await Customer.create(req.body);  
     response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
  response.message = CONSTANTS.CUSTOMER_CREATED;
  response.data = newCustomer;
    
  } catch (err) {
     response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
    response.message = CONSTANTS.CUSTOMER_CREATED_FAILED;
  }
  return res.json(response);
});

//delete the customer account 
exports.getCustomers = catchAsync(async (req, res) => {
  const response = {};
  try {
    const customers = await Customer.find();
    const newCustomers = customers.map(customer => ({
  _id: customer._id,
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
  lastLogin: customer.lastLogin,
  active: customer.active
}));
    response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
    response.message = CONSTANTS.CUSTOMER_FOUND;
    response.data = newCustomers;
  } catch (err) {
    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
    response.message = CONSTANTS.CUSTOMER_NOT_FOUND;
  }
  return res.json(response);
});
exports.deleteCustomer = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  res.json(token);
})
