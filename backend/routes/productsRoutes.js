// ! Express.js routes for products
const express = require("express");
const Router = express.Router();


const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");

const ValidatorSanitizer = new validatorSanitizer();
 const {searchproduct}=require('../controllers/productsController')











Router.get("/products", searchproduct) 

module.exports = Router;