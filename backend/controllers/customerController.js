// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
const crypto = require("crypto");
const Email = require("../helpers/Email");
const AppError = require("../helpers/AppError");
const catchAsync = require("../helpers/catchAsync");

exports.AddNewCustomer = catchAsync(async (req, res) => {
  const newCustomer = await Customer.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Customer: newCustomer,
    },
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

  res.status(200).json({
    status: "success",
    data: "logged in",
  });
  // 3) If everything ok, send token to client
  // createSendToken(user, 200, req, res);
});

exports.activate = async (req, res) => {
  const { token } = req.query;

  try {
    // Find the customer with the given token
    const customer = await Customer.findOne({ activationToken: token });

    if (!customer) {
      return res.status(404).json({ message: "Invalid activation token" });
    }

    // Check if the account is already active
    if (customer.active) {
      return res.json({ message: "Account is already active" });
    }

    // Activate the account
    customer.active = true;
    customer.activationToken = ""; // You can clear the token
    await customer.save();

    // Redirect to a confirmation page or display a success message
    return res.json({ message: "Account activated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};
