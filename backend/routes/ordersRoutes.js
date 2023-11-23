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

Router.post("/orders", createOrder);
Router.get("/orders/:id", TokenCheck, getOrderById);
Router.put("/orders/:id", TokenCheck, updateOrder);
Router.get("/orders", TokenCheck, listOrders);

module.exports = Router;
