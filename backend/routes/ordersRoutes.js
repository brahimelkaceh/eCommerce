// ! Express.js routes for orders
const express = require("express");
const Router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrder,
  listOrders,
} = require("../controllers/ordersController");
//const validatorSanitizer = require("../middlewares/validator");
//const ValidatorSanitizer = new validatorSanitizer();
const { TokenCheck } = require("../middlewares/TokenCheck");
const { CustomerTokenCheck } = require("../middlewares/CustomerTokenCheck");

Router.post("/requests", CustomerTokenCheck, createOrder);
Router.get("/requests/:id", CustomerTokenCheck, getOrderById);
Router.put("/requests/:id", CustomerTokenCheck, updateOrder);
Router.get("/requests", CustomerTokenCheck, listOrders);

module.exports = Router;
