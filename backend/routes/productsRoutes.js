// ! Express.js routes for products
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products/:productId', productsController.getProductById) ;

module.exports = router;
