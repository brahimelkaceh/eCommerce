// ! Express.js routes for users
const express = require("express");
const Router = express.Router();

const { Register } = require("../controllers/userController");

Router.post("/users", Register);

module.exports = Router;
