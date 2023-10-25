// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
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
