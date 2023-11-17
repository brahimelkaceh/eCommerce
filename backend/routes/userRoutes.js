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

Router.get("/users/profile", ManagerTokenCheck, (req, res) => {
  console.log("user", req.user);
  res.status(200).json(req.user);
});
Router.post("/users/login", ValidatorSanitizer.validate, login);
Router.post(
  "/users",
  TokenCheck,
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  createUser
);
Router.put(
  "/users/:id",
  TokenCheck,
  upload.array("images", 5),
  ValidatorSanitizer.validate,
  updateUser
);
Router.delete("/users/:id", TokenCheck, deleteUser);
Router.get("/users/", TokenCheck, searchUser);
Router.get("/users/:id", TokenCheck, getUserById);
Router.get("/getallusers/", TokenCheck, showAllUsers);

module.exports = Router;
