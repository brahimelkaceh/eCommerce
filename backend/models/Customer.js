// ! MongoDB schema/model for customers
//  ! MongoDB schema/model for users
// const mongoose = require("mongoose");
// const customerSchema = new mongoose.Schema({
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
//     }  ,
//   password: {
//     type: String,
//     required: true,
//     minLength: 10,
//   },
//   confirmPassword: {
//     type: String,
//     required: true,
//   },
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


// module.exports = mongoose.model("CustomerModel", customerSchema);
/* Customer Model */
// ! MongoDB schema/model for customers
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
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

module.exports = mongoose.model("CustomerModel", customerSchema);