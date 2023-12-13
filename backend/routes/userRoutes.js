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
  profile,
  getUserById,
  deleteUser,
  showAllUsers,
} = require("../controllers/userController");

Router.get("/users/profile", ManagerTokenCheck, profile);

Router.post("/users/login", ValidatorSanitizer.validate, login);
Router.post(
  "/users",
  upload.array("images", 5),
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  createUser
);
Router.put(
  "/users/:id",
  upload.array("images", 5),
  ManagerTokenCheck,
  ValidatorSanitizer.validate,
  updateUser
);
Router.delete("/users/:id", ManagerTokenCheck, deleteUser);
Router.get("/users/:id", ManagerTokenCheck, getUserById);
Router.get("/users/", ManagerTokenCheck, showAllUsers); //TokenCheck

module.exports = Router;
