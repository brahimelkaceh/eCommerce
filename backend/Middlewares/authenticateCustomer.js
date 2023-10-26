const jwt = require("jsonwebtoken");

exports.authenticateCustomer = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verifiedUser = jwt.verify(token, "your-secret-key"); // Use the same secret key used for signing the token
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
