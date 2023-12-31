//  ! Controller handling orders-related logic
const Category = require("../models/Categories");
const Customer = require("../models/Customer");
const subCategory = require("../models/SubCategories");
const catchAsync = require("../helpers/catchAsync");
const orders = require("../models/Order");
const CONSTANTS = require("../config/constants");
const Products = require("../models/Products");
const { sendOrder } = require("../middlewares/websocket");
exports.createOrder = catchAsync(async (req, res) => {
  const response = {};
  let cartTotalPrice = 0;
  let discountPrice = 0;
  let ProductPrice = 0;
  try {
    const { customerID, orderItems } = req.body;

    const customer = await Customer.findOne({ _id: customerID });
    if (!customer) {
      response.message = CONSTANTS.CUSTOMER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return res.json({ response });
    }
    for (let i = 0; i < orderItems.length; i++) {
      const element = orderItems[i];
      const product = await Products.findOne({ _id: element.product });
      console.log("product", product);

      if (!product) {
        response.message = CONSTANTS.PRODUCTS_NOT_FOUND;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return res.json({ response });
      }
      discountPrice = (product.discountPrice * product.options[0].price) / 100;
      discountPrice = discountPrice.toFixed(2);
      ProductPrice = product.options[0].price - discountPrice;
      cartTotalPrice += orderItems[i].quantity * ProductPrice;
    }
    req.body.cartTotalPrice = cartTotalPrice;
    const newOrder = await orders.create(req.body);
    const createdOrder = await orders
      .findById(newOrder._id)
      .populate("customerID", "firstName lastName");
    sendOrder(createdOrder);
    customer.orders.push(newOrder);
    await customer.save();
    if (newOrder) {
      response.message = CONSTANTS.ORDER_CREATED;
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
      return res.status(201).json({
        status: "success",
        data: createdOrder,
        // data: newOrder.toObject({ getters: true }),
      });
    } else {
      response.message = CONSTANTS.ORDER_CREATED_FAILED;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }

  return res.json({ response });
});
exports.getOrderById = catchAsync(async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const order = await orders
      .findOne({ _id: id })
      .populate({
        path: "orderItems.product",
        select: "productName price quantity images options discountPrice",
      })
      .populate("customerID", "email userName role images");
    if (order) {
      response.message = CONSTANTS.ORDER_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = order;
      return res.json({
        status: "success",
        data: order.toObject({ getters: true }),
      });
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
exports.listOrders = catchAsync(async (req, res) => {
  const response = {};
  try {
    const Orders = await orders
      .find()
      .populate({
        path: "orderItems.product",
        select: "productName price quantity images options",
      })
      .populate("customerID", "email userName role images");
    if (Orders) {
      response.message = CONSTANTS.ORDER_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = Orders;
      return res.json({
        status: "success",
        data: Orders.map((place) => place.toObject({ getters: true })),
      });
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
  console.log("req body", req.body);
  try {
    const { customerID, orderItems } = req.body;
    const customer = await Customer.findOne({ _id: customerID });
    if (!customer) {
      response.message = CONSTANTS.CUSTOMER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return res.json({ response });
    }
    // console.log("product: ", req.body);
    for (let i = 0; i < orderItems.length; i++) {
      const element = orderItems[i];
      //  console.log("element : ", orderItems[i]);
      const product = await Products.findOne({ _id: element.product });
      if (!product) {
        response.message = CONSTANTS.PRODUCTS_NOT_FOUND;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return res.json({ response });
      }
      if (req.body.Status === "Shipped") {
        product.quantity -= element.quantity;
      }
      await Products.findByIdAndUpdate(
        product._id,
        {
          ...product,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Run validators on update
        }
      ).populate("subCategoryId", "subCategoryName");
    }
    const id = req.params.id;
    const newOrderData = req.body;

    const updatedOrder = await orders.updateOne(
      { _id: id },
      { $set: newOrderData }
    );

    response.message = CONSTANTS.ORDER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
    // return res.status(201).json({
    //   status: "success",
    //   data: updatedOrder,
    // });
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});
