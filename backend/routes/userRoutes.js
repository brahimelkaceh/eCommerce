const express = require("express");
const Router = express.Router();
//const multer = require('multer');
const upload = require("../middlewares/multer");
const validatorSanitizer = require("../middlewares/validator");
const { TokenCheck } = require("../middlewares/TokenCheck");
const { ManagerTokenCheck } = require("../middlewares/ManagerTokenCheck");
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

Router.post("/users/login", ValidatorSanitizer.validate, login);
Router.post(
  "/users",
  TokenCheck,
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  createUser,
);
Router.put(
  "/users/:id",
  TokenCheck,
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  updateUser
);
Router.delete("/users/:id", deleteUser);
Router.get("/users/", TokenCheck, searchUser);
Router.get("/users/:id", TokenCheck, getUserById);
Router.get("/users/", TokenCheck, showAllUsers);

module.exports = Router;
