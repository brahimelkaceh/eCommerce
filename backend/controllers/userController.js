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
