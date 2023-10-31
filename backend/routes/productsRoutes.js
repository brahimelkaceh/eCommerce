// ! Express.js routes for products
const express = require('express');
const Router = express.Router();
const { createProduct, getAllProducts ,searchProducts,getProductById,updateProduct,deleteProduct} = require('../controllers/productsController');
const validatorSanitizer = require("../middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
const { TokenCheck } = require('../middlewares/TokenCheck');

Router.post('/products',ValidatorSanitizer.validate,createProduct);
Router.get('/products',TokenCheck, getAllProducts);
Router.get('/products/search',searchProducts);
Router.get('/products/:id', getProductById);
Router.patch('/products/:id',ValidatorSanitizer.validate,updateProduct);
Router.delete('/products/:id', deleteProduct);









module.exports = Router;