// ! Express.js routes for users
const express = require("express");
const Router = express.Router();
const jwt = require('jsonwebtoken');

// Your JWT token

// Your JWT secret key used for signing and verifying tokens
const userRole  = 'admin'
  const { Register,search,getbyid,deletee } = require("../controllers/userController");

function checkAdminAuthorization(req, res, next) {
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //       console.error('JWT verification failed:', err);
    //       // Handle the error (e.g., invalid token)
    //     } else {
    //       // Access the user's role from the decoded JWT payload
    //       // const userRole = decoded.role;
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

Router.post("/users", Register);
Router.get("/users/",search);
Router.get("/users/:id",getbyid)
Router.delete('/users/:id', checkAdminAuthorization,deletee)

module.exports = Router;
