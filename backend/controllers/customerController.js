// ! Controller handling Customers-related logic
require("dotenv").config();
const crypto = require("crypto");
// const salt = await bcrypt.genSalt(10);
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Email = require("../helpers/Email");
const AppError = require("../helpers/AppError");
const catchAsync = require("../helpers/catchAsync");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.signup = catchAsync(async (req, res, next) => {
  // Check if password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      status: "error",
      message: "Password and confirm password do not match.",
    });
  }

  const activationToken = crypto.randomBytes(32).toString("hex");

  // Create new customer without saving passwordConfirm in the database
  const newCustomer = await Customer.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    activationToken: activationToken,
  });

  // Construct the activation URL with the token
  const activationURL = `${req.protocol}://${req.get(
    "host"
  )}/customers/activate?token=${activationToken}`;
  console.log("activation url : " + activationURL);
  // Send the activation email
  await new Email(newCustomer, activationURL).sendWelcome();

  res.status(201).json({
    status: "success",
    message: "Please check your email for the activation link.",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 422, errors.array()));
  }

  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const customer = await Customer.findOne({ email });

  if (!customer || !(await bcrypt.compare(password, customer.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) Generate JWT token
  const token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  // 4) If everything is OK, send token to the client
  res.status(200).json({
    status: "success",
    data: { customer },
    token,
  });
});

exports.activate = catchAsync(async (req, res) => {
  const { token } = req.query;

  // Find the customer with the given token
  const customer = await Customer.findOne({ activationToken: token });

  if (!customer) {
    return res.status(404).json({
      status: "fail",
      data: "Invalid activation token",
    });
  }
  // Check if the account is already active
  if (customer.active) {
    return res.status(404).json({
      status: "fail",
      data: "Account is already active",
    });
  }
  // Activate the account
  customer.active = true;
  customer.activationToken = ""; // You can clear the token
  await customer.save();

  // Redirect to a confirmation page or display a success message
  return res.status(200).json({
    status: "success",
    data: "Account activated successfully",
  });
});

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await Customer.find({});
  if (!customers) {
    return res.status(404).json({
      status: "fail",
      data: "No customers",
    });
  }

  res.status(200).json({
    status: "success",
    data: { customers },
  });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const customerId = req.params.id;

  // 1) Validate customer ID
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return next(new AppError("Invalid customer ID", 400));
  }

  // 2) Find and delete customer
  const customer2delete = await Customer.findByIdAndDelete(customerId);

  // 3) Handle customer not found
  if (!customer2delete) {
    return next(new AppError("Customer not found", 404));
  }

  // 4) Log customer deletion (implement logging mechanism)

  // 5) Send success response
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customerId = req.params.id;
  const { firstName, lastName, email, userName } = req.body;
  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    {
      userName,
      firstName,
      lastName,
      email,
    },
    { new: true, runValidators: true }
  );
  if (!updatedCustomer) {
    res.status(404).json({
      status: "fail",
      data: "Customer not updated",
    });
  }
  res.status(200).json({
    status: "success",
    data: { updatedCustomer },
  });
});

exports.getCustomerById = catchAsync(async (req, res, next) => {
  const customerId = req.params.id;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    res.status(404).json({
      status: "fail",
      data: "Customer not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: { customer },
  });
});

exports.searchForCustomer = catchAsync(async (req, res, next) => {
  const searchParams = req.query;
  console.log(searchParams);
  const customers = await Customer.find(searchParams);
  console.log(customers);
  if (!customers || customers.length === 0) {
    return res.status(404).json({
      status: "fail",
      data: "No customers found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { customers },
  });
});
