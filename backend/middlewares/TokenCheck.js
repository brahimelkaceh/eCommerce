const CONSTANTS = require("../config/constants.js");
const jwt = require("jsonwebtoken");
exports.TokenCheck = (req, res, next) => {
  try {
    // retrieve the authorization header from the request
    const authHeader = req.headers.authorization || null;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error(CONSTANTS.ROUTE_NOT_FOUND);
    }
    const userData = jwt.verify(token, process.env.SECRET_KEY);
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
      throw new Error("Access denied. User is not an admin.");
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Unauthorized",
      status: CONSTANTS.UNAUTHORIZED_HTTP_CODE,
    });
  }
};
