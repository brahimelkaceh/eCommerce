const CONSTANTS = require("../config/constants.js");
const jwt = require("jsonwebtoken");
exports.TokenCheck = (req, res, next) => {
  // retrieve the authorization header from from the request
  const authHeader = req.headers.authorization || null;
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.json({
      message: CONSTANTS.ROUTE_NOT_FOUND,
      status: CONSTANTS.SERVER_ERROR_HTTP_CODE,
    });
  }
  const userData = jwt.verify(token, process.env.SECRET_KEY);
  console.log(userData);
  if (!userData) {
    return res.json({
      message: "error while verifying the token ",
      status: 404,
    });
  }
  req.username = userData.username;
  req._id = userData._id;
  req.role = userData.role;
  req.email = userData.email;
  if (req.role === "admin") {
    next();
  } else {
    return res.json({
      message: "error while decoding the token ",
      status: 404,
    });
  }
};
