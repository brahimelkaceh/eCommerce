// ! Controller handling Customers-related logic
const Customer = require("../models/Customer");
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
