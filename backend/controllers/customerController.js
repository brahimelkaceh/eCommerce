// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");

exports.AddNewCustomer = catchAsync(async (req, res) => {
  const newCustomer = await Customer.create(req.body);

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
