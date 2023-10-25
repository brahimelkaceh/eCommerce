// //  ! MongoDB schema/model for users
// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   role: {
//     type: String,
//     required: true,
//     trim: true,
//     enum: ["admin", "manager"],
//   },
//   userName: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 10,
//   },
//   confirmPassword: {
//     type: String,
//     required: [true, "please enter a password to confirm"],
//     },
//   creationDate: {
//     type: Date,
//     default: Date.now,
//   },
//   lastLogin: {
//     type: Date,
//     default: null,
//   },
//   lastUpdate: {
//     type: Date,
//     default: null,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
// });
// module.exports = mongoose.model("UserModel", userSchema);
/* use another schema */
//  ! MongoDB schema/model for users
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
     type: String,
     required: true,
     trim: true,
    enum: ["admin", "manager"],
     default : "manager"
   },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  lastUpdate: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("UserModel", userSchema);