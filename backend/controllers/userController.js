// ! Controller handling user-related logic
const User = require("../models/User");
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../config/constants");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const mailSender = require("../helpers/mailSender");

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(email , password)
  

  // Find the user by their email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
console.log(isPasswordValid)
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.role === "admin") {
    // Admins can log in directly

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY
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
    process.env.SECRET_KEY
  );

  res.status(200).json({ token });
});

exports.createUser = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization || null;

  const { userName, email, password, confirmPassword, role, ...userData } =
    req.body;
    console.log(userData)
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
    if (
      (newUserData.password && !newUserData.confirmPassword) ||
      (!newUserData.password && newUserData.confirmPassword)
    ) {
      response.message = "password and confirm Password are required";
      response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
      return res.json({ response });
    }
    if (newUserData.password && newUserData.confirmPassword) {
      if (newUserData.password === newUserData.confirmPassword) {
        const hashedPassword = await bcrypt.hash(newUserData.password, 12);
        newUserData.password = hashedPassword;
      } else {
        response.message = "password doesn't match";
        response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
        return res.json({ response });
      }
    }

    const updateData = { lastUpdate: Date.now(), ...newUserData };
    await User.updateOne({ _id: id }, { $set: updateData });
    response.message = CONSTANTS.USER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});

exports.searchUser = async (req, res) => {
  try {
    const namee = req.query.query;
    const allusers = await User.find({ userName: namee })
      .sort({ _id: "descending" })
      .limit(10);
    if (!allusers.length) {
      res.json("User not found"); // change this with constants
    } else {
      res.json({ data: allusers });
    }
  } catch (err) {
    throw err;
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("User not found");
  } else {
    const user = await User.findOne({ _id: id });
    res.json({ data: user });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndRemove(userId);

    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: "descending" }).limit(10); // This assumes you have a User model defined
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
