// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const { createUser } = require("../controllers/userController");

Router.post("/users", createUser);

module.exports = Router;
