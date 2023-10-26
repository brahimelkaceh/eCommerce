const express = require("express");
const Router = express.Router();
const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");
const ValidatorSanitizer = new validatorSanitizer();
const { createUser, updateUser } = require("../controllers/userController");

Router.post("/users", TokenCheck, createUser);
Router.patch("/users/:id", ValidatorSanitizer.validate, updateUser);

module.exports = Router;
