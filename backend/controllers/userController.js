// ! Controller handling user-related logic
const User = require("../models/User");
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../config/constants");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose")

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by their email
  const user = await User.findOne({ email });

  // Verify the hashed entered password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.role === "admin") {
    // Admins can log in directly
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      "your-secret-key"
    );
    return res.status(200).json({ token });
  }

  // For managers, check if the user is active
  if (!user.active) {
    return res.status(401).json({ message: "User is not active" });
  }

  // Update the last login date
  user.lastLogin = new Date();
  await user.save();

  // Create and send the JWT token for managers
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    "your-secret-key"
  );

  res.status(200).json({ token });
});

exports.createUser = catchAsync(async (req, res) => {
  const { userName, email, password, confirmPassword, role, ...userData } =
    req.body;
  const existingUser = await User.findOne({ email: email });
  const existingCustomer = await Customer.findOne({ email: email });
  if (existingUser || existingCustomer) {
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
      role: role,
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
  res.status(201).json({ message: `${role} user created successfully.` });
});

exports.updateUser = catchAsync(async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const newUserData = req.body;

    const updateData = { lastUpdate: Date.now() };
    if (newUserData.password && newUserData.confirmPassword) {
      if (newUserData.password === newUserData.confirmPassword) {
        const hashedPassword = await bcrypt.hash(newUserData.password, 12);
        updateData.password = hashedPassword;
      } else {
        response.message = "password doesn't match";
        response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
        return res.json({ response });
      }
    } else {
      response.message = "password and confirm Password are required";
      response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
      return res.json({ response });
    }
    if (newUserData.firstName) {
      updateData.firstName = newUserData.firstName;
    }
    if (newUserData.lastName) {
      updateData.lastName = newUserData.lastName;
    }
    if (newUserData.email) {
      updateData.email = newUserData.email;
    }
    if (newUserData.userName) {
      updateData.userName = newUserData.userName;
    }

    await User.updateOne({ _id: id }, { $set: updateData });
    response.message = CONSTANTS.USER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});




exports.searchUser=async(req,res)=>{
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
exports.getUserById=async(req,res)=>{
  const id = req.params.id
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('User not found')}else{
  const user=await User.findOne({_id:id})
  console.log(user)
  res.json({data:user})
 }}
 exports.deleteUser=async(req,res)=>{
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
 