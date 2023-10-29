require("dotenv").config();
const jwt = require("jsonwebtoken");
function authenticateJWT(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid Authorization header format" });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }

    req.user = user; // Attach user information to the request object
    next();
  });
}

function restrictTo(roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log("User role:", user.customer.role);
    console.log("Allowed roles:", roles);

    if (user && roles.includes(user.customer.role)) {
      next();
    } else {
      console.log("Access denied");
      res.status(403).json({ status: "fail", data: "Access denied" });
    }
  };
}

module.exports = {
  authenticateJWT,
  restrictTo,
};
