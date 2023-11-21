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
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["admin", "manager"],
    default: "manager",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
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
