// ! Express.js routes for products
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products/:productId', productsController.getProductById) ;

module.exports = router;
=======
const express = require("express");
const Router = express.Router();


const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");

const ValidatorSanitizer = new validatorSanitizer();
 const {searchproduct}=require('../controllers/productsController')











Router.get("/products", searchproduct) 

module.exports = Router;
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
