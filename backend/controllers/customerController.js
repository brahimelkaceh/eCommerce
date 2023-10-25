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
const jwt = require("jsonwebtoken");
exports.AddNewCustomer = catchAsync(async (req, res) => {
  const { password, confirmPassword, ...customerData } = req.body;
  console.log(customerData);
  // const newCustomer = await Customer.create(req.body);
  return;
  res.status(201).json({
    status: "success",
    data: {
      Customer: newCustomer,
    },
  });
});
exports.search=async(req,res)=>{
  const namee=req.query.query
  const allCustomers= await Customer.find({firstName: namee}).sort({_id:"descending"}).limit(10)
  if(!allCustomers.length){
    res.json('user not found')
  }else{
  res.json({data:allCustomers})
  // console.log(allusers)
}}
exports.getbyid=async(req,res)=>{
  const id = req.params.id
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('User not found')}else{
  const customer=await Customer.findOne({_id:id})
  res.json({data:customer})
 }}

exports.CustomerProfile = catchAsync(async (req, res) => {
  const userId = "65364b82bf0047d3f93fa412"; // User ID from the authenticated token payload
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    return res.status(404).json({ error: "Customer profile not found" });
  }
  console.log(customer);
  res.end();
});
