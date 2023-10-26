// ! Express.js routes for users
const express = require("express");
const Router = express.Router();
const { TokenCheck } = require("../Middlewares/TokenCheck"); // use it when you get a create a real token
const validatorSanitizer = require("../Middlewares/validator");
const ValidatorSanitizer = new validatorSanitizer();
const {
  Register,
  createUser,
  updateUser,
} = require("../controllers/userController");

Router.post("/users", createUser);
Router.patch("/users/:id", ValidatorSanitizer.validate, updateUser);
const jwt = require("jsonwebtoken");

// Your JWT token

// Your JWT secret key used for signing and verifying tokens
const userRole = "admin";
const {
  createUser,
  search,
  getbyid,
  deletee,
} = require("../controllers/userController");

function checkAdminAuthorization(req, res, next) {
  if (userRole === "admin") {
    // User is an admin, proceed to the next middleware
    next();
  } else {
    // User is not authorized
    res
      .status(403)
      .json({ message: "Access denied. Admin authorization required." });
  }
}

Router.post("/users", createUser);
Router.get("/users/", search);
Router.get("/users/:id", getbyid);
Router.delete("/users/:id", checkAdminAuthorization, deletee);

module.exports = Router;
