// ! Controller handling user-related logic
const User = require("../models/User");
const catchAsync = require("../helpers/catchAsync");
const mongoose = require('mongoose');

exports.Register = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
exports.search=async(req,res)=>{
  try{
  const namee=req.query.query
  const allusers= await User.find({userName: namee}).sort({_id:"descending"}).limit(10)
  if (!allusers.length){
    res.json('User not found'); // change this with constants 
  }else{
  res.json({data:allusers})
  console.log(allusers)
}}catch(err)
{throw err}}
exports.getbyid=async(req,res)=>{
  const id = req.params.id
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('User not found')}else{
  const user=await User.findOne({_id:id})
  console.log(user)
  res.json({data:user})
 }}
 exports.deletee=async(req,res)=>{
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndRemove(userId);

    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
