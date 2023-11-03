//  ! Controller handling orders-related logic
const Category = require("../models/Categories");
const subCategory = require("../models/SubCategories");
const catchAsync = require("../helpers/catchAsync");
const orders = require("../models/Order");
const CONSTANTS = require("../config/constants");
const Products = require("../models/Products");
const AppError = require("../helpers/appError");
exports.createOrder = catchAsync(async (req, res, next) => {
  const { customerID, orderItems, cartTotalPrice } = req.body;

  try {
    const newOrder = new orders({
      customerID,
      orderItems,
      cartTotalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      status: "success",
      data: savedOrder,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
});
exports.getOrderById = catchAsync(async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const order = await orders.findOne({ _id: id });
    if (order) {
      response.message = CONSTANTS.ORDER_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = order;
    } else {
      response.message = CONSTANTS.ORDER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});
exports.updateOrder = catchAsync(async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const newOrderData = req.body;
    await orders.updateOne({ _id: id }, { $set: newOrderData });
    response.message = CONSTANTS.ORDER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});
exports.listOrders = catchAsync(async (req, res) => {
  const response = {};
  try {
    const Orders = await orders.find().limit(10);
    if (Orders) {
      response.message = CONSTANTS.ORDER_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = Orders;
    } else {
      response.message = CONSTANTS.ORDER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});
