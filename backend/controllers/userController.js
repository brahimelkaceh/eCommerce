// ! Controller handling user-related logic
const User = require("../models/User");
const catchAsync = require("../helpers/catchAsync");

exports.Register = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
