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

Router.get("/users/profile", TokenCheck, (req, res) => {
  console.log("user", req.user);
  res.status(200).json(req.user);
});
Router.post("/users/login",ValidatorSanitizer.validate, login);
Router.post(
  "/users",
  upload.array("images", 5),
  TokenCheck,
  ValidatorSanitizer.validate,
  createUser
);
Router.put(
  "/users/:id",
  upload.array("images", 5),
  TokenCheck,
  ValidatorSanitizer.validate,
  updateUser
);
Router.delete("/users/:id",TokenCheck,deleteUser);
 Router.get("/users/", TokenCheck, searchUser);
Router.get("/users/:id", TokenCheck, getUserById);
Router.get("/users/",TokenCheck ,showAllUsers); //TokenCheck

module.exports = Router;
