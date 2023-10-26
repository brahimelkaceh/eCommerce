const express = require("express");
const Router = express.Router();
//const validatorSanitizer = require("../Middlewares/validator");
//const ValidatorSanitizer = new validatorSanitizer();
const {
  login,
  createUser,
  updateUser,
  searchUser,getUserById,deleteUser
} = require("../controllers/userController");


Router.post("/users/login", login);
Router.post("/users", createUser);
Router.patch("/users/:id", updateUser);

// Your JWT token
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXNlclJvbGUiOiJhZG1pbiJ9.MDgdW84HPdfLTEjXao0-BRtpS5CfH24UsdeGqmywwxg'
// const secret='my secret'
// Your JWT secret key used for signing and verifying tokens
const userRole  = 'admin'
 
  // const decoded = jwt.verify(token,secret)
  //   const {userRole } = decoded

function checkAdminAuthorization(req, res, next) {
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //       console.error('JWT verification failed:', err);
    //       // Handle the error (e.g., invalid token)
    //     } else {
    //       // Access the user's role from the decoded JWT payload
    //       const userRole = decoded.role;
    //       console.log('User Role:', userRole);
      
    //       // Now, you have the user's role and can use it for authorization checks.
    //     }
    //   });
    if (userRole === 'admin') {
      // User is an admin, proceed to the next middleware
      next();
    } else {
      // User is not authorized
      res.status(403).json({ message: 'Access denied. Admin authorization required.' });
    }
  }

  
Router.get("/users/",searchUser);
Router.get("/users/:id",getUserById)
Router.delete('/users/:id', checkAdminAuthorization,deleteUser)

module.exports = Router;


