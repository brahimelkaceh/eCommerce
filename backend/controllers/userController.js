// ! Controller handling user-related logic
const User = require("../models/User");
const catchAsync = require("../helpers/catchAsync");
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const CONSTANTS = require('../config/constants')

exports.Register = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  console.log(newUser);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { userName, email, password, role, ...userData } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use." });
  }
 
  const hashedPassword = await bcrypt.hash(password, 12);

  let newUser;
  if (role.toLowerCase() === "manager" ) {
    newUser = new User({
      ...userData,
      userName: userName,
      email: email,
      password: hashedPassword,
      role : role
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

exports.updateUser = catchAsync(async (req, res) => {
  const response = {};
  try {
     const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
         response.message = CONSTANTS.USER_NOT_FOUND;
    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
    }
      const newUserData = req.body;
  const EditedUser = await User.updateOne({ _id: id }, {
    $set: {
      userName: newUserData.userName,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email : newUserData.email
    }
  });
    response.message = CONSTANTS.USER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
      
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
   return res.json({ response });

})