// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
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
  const newCustomer = await Customer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  // console.log(url);
  await new Email(newCustomer, url).sendWelcome();

  res.status(201).json({
    status: "success",
    data: { newCustomer },
  });
  // createSendToken(newUser, 201, req, res);
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
