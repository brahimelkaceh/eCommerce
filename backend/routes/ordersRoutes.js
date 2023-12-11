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
const { ManagerTokenCheck } = require("../middlewares/ManagerTokenCheck");
const { getProductsByCategory } = require("../controllers/productsController");

Router.post("/orders", CustomerTokenCheck, createOrder);
Router.get("/orders/:id", ManagerTokenCheck, getOrderById);
Router.put("/orders/:id", ManagerTokenCheck, updateOrder);
Router.get("/orders", ManagerTokenCheck, listOrders);
Router.get("/shop", getProductsByCategory);

module.exports = Router;
