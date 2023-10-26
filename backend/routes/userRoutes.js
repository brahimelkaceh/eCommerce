const express = require("express");
const Router = express.Router();
//const validatorSanitizer = require("../Middlewares/validator");
//const ValidatorSanitizer = new validatorSanitizer();
const {
  createUser,
  updateUser,
} = require("../controllers/userController");

Router.post("/users", createUser);
Router.patch("/users/:id", updateUser);

module.exports = Router;