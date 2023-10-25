require("dotenv").config();
const jwt = require("jsonwebtoken");
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }

    req.user = user; // Attach user information to the request object
    next();
  });
}

function restrictTo(...roles) {
  return (req, res, next) => {
    const user = req.user; // Assuming you have user information attached by JWT middleware

    if (user && roles.includes(user.role)) {
      // User has one of the allowed roles; continue to the route
      next();
    } else {
      // User does not have one of the allowed roles; send a 403 Forbidden response
      res.status(403).json({ message: "Access denied" });
    }
  };
}

module.exports = {
  authenticateJWT,
  restrictTo,
};
