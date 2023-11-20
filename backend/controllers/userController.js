// ! Controller handling user-related logic
const User = require("../models/User");
const Customer = require("../models/Customer");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../config/constants");
const jwt = require("jsonwebtoken");
//const sharp = require('sharp'); // Import the "sharp" library
const mongoose = require("mongoose");
const AppError = require("../helpers/appError");
const mailSender = require("../helpers/mailSender");
const { addImages } = require("../helpers/addImage");
const { checkingID } = require("../helpers/checkIfExist");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Find the user by their email
  const user = await User.findOne({ email });
  console.log(user)
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return next(new AppError("Invalid password", 404));
  }

  if (user.role === "admin") {
    // Admins can log in directly

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.userName,
      },
      process.env.SECRET_KEY
    );
    // user.lastLogin = new Date();
    // console.log(user.lastLogin);
    await user.save();
    console.log(user);

    return res.status(200).json({ status: "success", data: token, user: user });
  }

  // For managers, check if the user is active
  if (!user.active) {
    return next(new AppError("Inactive account!", 404));
  }

  // Update the last login date
  // user.lastLogin = new Date.now();
  console.log(user.lastLogin);
  await user.save();

  // Create and send the JWT token for managers
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      username: user.userName,
    },
    process.env.SECRET_KEY
  );

  res.status(200).json({ status: "success", data: token, user });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization || null;

  const { userName, email, password, confirmPassword, role, ...userData } =
    req.body;
  // console.log(req.body);
  // console.log(role);
  const images = req.files;
  const uploadedImages = await addImages(images);
  uploadedImages.map((image) => console.log([image.imageUrl]));
  const existingUser = await User.findOne({ email: email });
  const existingCustomer = await Customer.findOne({ email: email });
  if (existingUser || existingCustomer) {
    return next(new AppError("Email already in use", 404));
  }
  if (password !== confirmPassword) {
    return next(new AppError("Invalid password", 404));
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  let newUser;
  if (role.toLowerCase() === "manager") {
    newUser = new User({
      ...userData,
      userName: userName,
      email: email,
      password: hashedPassword,
      // images: uploadedImages.map((image) => image.imageUrl),
      role: role,
    });
  } else if (role.toLowerCase() === "customer") {
    newUser = new Customer({
      ...userData,
      userName: userName,
      email: email,
      images: uploadedImages.map((image) => image.imageUrl),
      password: hashedPassword,
    });
  } else {
    return next(new AppError("Invalid role, must be Manager or Customer"));
  }
  // Save the user to the database
  await newUser.save();
  res
    .status(201)
    .json({ status: "success", data: `${role} user created successfully.` });
});

exports.updateUser = catchAsync(async (req, res) => {
  const response = {};
  const images = req.files;
  const uploadedImages = await addImages(images);
  try {
    const id = req.params.id;
    const user = await checkingID(id);
    if (!user) {
      response.message = CONSTANTS.USER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
      return res.json({ response });
    }
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

    const updateData = {
      lastUpdate: Date.now(),
      ...newUserData,
      images: uploadedImages.map((image) => image.imageUrl),
    };
    await User.updateOne({ _id: id }, { $set: updateData });
    response.message = CONSTANTS.USER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
  } catch (err) {}
  return res.json({ response });
});

exports.searchUser = async (req, res, next) => {
  try {
    const searchParams = req.query;
    console.log(searchParams);
    const allUsers = await User.find(searchParams)
      .sort({ _id: "descending" })
      .limit(10);
    if (!allUsers.length) {
      return next(new AppError("User not found", 404));
    } else {
      res.json({ status: "success", data: allUsers });
    }
  } catch (err) {
    throw err;
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("User not found", 404));
  } else {
    const user = await User.findOne({ _id: id });
    res.json({ status: "success", data: user });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndRemove(userId);

    if (user) {
      res.json({ status: "success", message: "User deleted successfully" });
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (err) {
    next(new AppError(err.message, 500));
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
