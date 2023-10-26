const express = require("express");
const Router = express.Router();

const {
  login,
  createUser,
  updateUser,
  searchUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const userRole = "admin";
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

Router.post("/users/login", login);
Router.post("/users", createUser);
Router.patch("/users/:id", updateUser);
Router.get("/users/", searchUser);
Router.get("/users/:id", getUserById);
Router.delete("/users/:id", checkAdminAuthorization, deleteUser);

module.exports = Router;
