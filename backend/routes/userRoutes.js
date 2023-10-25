// ! Express.js routes for users
const express = require("express");
const Router = express.Router();
const { TokenCheck } = require("../Middlewares/TokenCheck"); // use it when you get a create a real token
const validatorSanitizer = require('../Middlewares/validator');
const ValidatorSanitizer = new validatorSanitizer();
const { Register,createUser,updateUser } = require("../controllers/userController");

Router.post("/users" ,createUser);
Router.patch("/users/:id" ,ValidatorSanitizer.validate, updateUser);
module.exports = Router;
