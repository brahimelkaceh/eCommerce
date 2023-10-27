// ! Controller handling Customers-related logic
require("dotenv").config();
const crypto = require("crypto");
// const salt = await bcrypt.genSalt(10);
const jwt = require("jsonwebtoken");

const Customer = require("../models/Customer");
const Email = require("../helpers/Email");
const AppError = require("../helpers/AppError");
const catchAsync = require("../helpers/catchAsync");
const { webcrypto } = require("crypto");
const bcrypt = require("bcrypt");

exports.AddNewCustomer = catchAsync(async (req, res) => {
  const newCustomer = await Customer.create(req.body);

  res.status(201).json({
    status: "success",
    data: newCustomer,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  // Generate an activation token
  const activationToken = crypto.randomBytes(32).toString("hex");

  // Create a new customer with the activation token
  const newCustomer = await Customer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    activationToken: activationToken,
  });

  // Construct the activation URL with the token
  const activationURL = `${req.protocol}://${req.get(
    "host",
  )}/customers/activate?token=${activationToken}`;

  // Send the activation email
  await new Email(newCustomer, activationURL).sendWelcome();

  res.status(201).json({
    status: "success",
    message: "Please check your email for the activation link.",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const customer = await Customer.findOne({ email }).select("+password");

  if (
    !customer ||
    !(await customer.correctPassword(password, customer.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (customer.active === false) {
    return next(new AppError("Please activate your account to login in", 401));
  }

  const token = jwt.sign({ customer }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  // 3) If everything ok, send token to client
  // createSendToken(user, 200, req, res);
  res.status(200).json({
    status: "success",
    data: customer,
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
    data: customers,
  });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const cid = req.params.cid;
  const customer2delete = await Customer.findByIdAndDelete(cid);
  if (!customer2delete) {
    res.status(404).json({
      status: "fail",
      data: "Customer not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
  const cid = req.params.cid;
  const { firstName, lastName, email } = req.body;
  const customer2update = await Customer.findByIdAndUpdate(
    cid,
    {
      firstName,
      lastName,
      email,
    },
    { new: true, runValidators: true },
  );
  if (!customer2update) {
    res.status(404).json({
      status: "fail",
      data: "Customer not updated",
    });
  }
  res.status(200).json({
    status: "success",
    data: customer2update,
  });
});

exports.getCustomerById = catchAsync(async (req, res, next) => {
  const cid = req.params.cid;
  const customer = await Customer.findById(cid);
  if (!customer) {
    res.status(404).json({
      status: "fail",
      data: "Customer not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: customer,
  });
});

exports.searchForCustomer = catchAsync(async (req, res, next) => {
  const searchParams = req.query;
  console.log(searchParams);
  const customers = await Customer.find(searchParams);
  // console.log(customers);
  if (!customers || customers.length === 0) {
    return res.status(404).json({
      status: "fail",
      data: "No customers found",
    });
  }

  res.status(200).json({
    status: "success",
    data: customers,
  });
});
