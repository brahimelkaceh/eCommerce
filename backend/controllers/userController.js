// ! Controller handling user-related logic
const User = require("../models/User");
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
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
 

exports.createUser = catchAsync(async (req, res) => {
  const { userName, email, password, confirmPassword, role, ...userData } =
    req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  let newUser;
  if (role.toLowerCase() === "manager") {
    newUser = new User({
      ...userData,
      userName: userName,
      email: email,
      password: hashedPassword,
    });
  } else if (role.toLowerCase() === "customer") {
    newUser = new Customer({
      ...userData,
      userName: userName,
      email: email,
      password: hashedPassword,
    });
  } else {
    return res
      .status(400)
      .json({ error: "Invalid role. Role must be manager or customer." });
  }
  // Save the user to the database
  await newUser.save();
  res.status(201).json({ message: "Manager user created successfully." });
});
