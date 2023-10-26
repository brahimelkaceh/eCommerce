// ! Controller handling user-related logic
// ! Controller handling user-related logic
const User = require("../models/User");
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../config/constants");






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