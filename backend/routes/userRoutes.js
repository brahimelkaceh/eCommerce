const express = require("express");
const Router = express.Router();
//const multer = require('multer');
const upload = require("../middlewares/multer");
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

Router.post("/users/login",ValidatorSanitizer.validate  ,login);
Router.post("/users", upload.array("images", 5), createUser);//TokenCheck
Router.put(
  "/users/:id",
   upload.array("images", 5),
  ValidatorSanitizer.validate,
  updateUser,
);//TokenCheck
Router.delete("/users/:id", deleteUser);//TokenCheck
Router.get("/users/", TokenCheck, searchUser);
Router.get("/users/:id", TokenCheck, getUserById);
Router.get("/getallusers/", showAllUsers);//TokenCheck

module.exports = Router;
