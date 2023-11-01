// ! Express.js routes for orders
const express = require('express');
const Router = express.Router();
const { createOrder,getOrderById,updateOrder,listOrders } = require('../controllers/ordersController');
//const validatorSanitizer = require("../middlewares/validator");
//const ValidatorSanitizer = new validatorSanitizer();
//const { TokenCheck } = require('../middlewares/TokenCheck');

Router.post('/requests',createOrder);
Router.get('/requests/:id', getOrderById); 
Router.put('/requests/:id',updateOrder)
Router.get('/requests', listOrders);










module.exports = Router;