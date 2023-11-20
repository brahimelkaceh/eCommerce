const CONSTANTS = require("../config/constants.js");
const jwt = require("jsonwebtoken");
const AppError = require("../helpers/appError");
exports.TokenCheck = (req, res, next) => {
  console.log(req.body);
  try {
    // retrieve the authorization header from the request
    const authHeader = req.headers.authorization || null;
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token: " + token);
    if (!token) {
      throw new Error(CONSTANTS.ROUTE_NOT_FOUND);
    }
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    console.log(userData);
    if (!userData) {
      throw new Error("Error while verifying the token");
    }

    req.username = userData.username;
    req._id = userData._id;
    req.role = userData.role;
    req.email = userData.email;

    if (req.role === "admin") {
      next();
    } else {
      next(new AppError("You don't have the permission, must be admin", 404));
    }
  } catch (error) {
    return next(new AppError("Couldn't verify the token", 404));
  }
};
