const express = require("express");
const Router = express.Router();
const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");
const ValidatorSanitizer = new validatorSanitizer();
const {
  login,
  createUser,
  updateUser,
  searchUser,
  getUserById,
  deleteUser,
  showAllUsers,
} = require("../controllers/userController");

Router.post("/users/login", login);
Router.post("/users", TokenCheck, createUser);
Router.patch("/users/:id", TokenCheck, ValidatorSanitizer.validate, updateUser);
Router.delete("/users/:id", TokenCheck, deleteUser);
Router.get("/users/", TokenCheck, searchUser);
Router.get("/users/:id", TokenCheck, getUserById);
Router.get("/getallusers/", TokenCheck, showAllUsers);

module.exports = Router;
