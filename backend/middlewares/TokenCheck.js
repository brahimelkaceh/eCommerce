const CONSTANTS = require("../config/constants.js");
const jwt = require("jsonwebtoken");
const AppError = require("../helpers/appError");

exports.TokenCheck = (req, res, next) => {
  try {
    // Retrieve the authorization header from the request
    const authHeader = req.headers.authorization || null;
    // Check if there is a token in the authorization header
    if (!authHeader) {
      throw new AppError(CONSTANTS.ROUTE_NOT_FOUND, 404);
    }

    const token = authHeader.split(" ")[1];
    // Verify the token
    const userData = jwt.verify(token, process.env.SECRET_KEY);

    // Check if userData exists
    if (!userData) {
      throw new AppError("Error while verifying the token", 401);
    }

    // Assign user data to request object for future use in the route
    req.username = userData.username;
    req._id = userData._id;
    req.role = userData.role;
    req.email = userData.email;

    // Check if the user has admin role, if yes, proceed
    if (req.role === "admin") {
      next();
    } else {
      throw new AppError("You don't have the permission, must be admin", 403);
    }
  } catch (error) {
    // Handle any caught errors and pass it to the error handling middleware
    return next(error);
  }
};
