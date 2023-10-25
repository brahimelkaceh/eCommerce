//  ! MongoDB schema/model for users
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter a first name"],
  },
  lastName: {
    type: String,
    required: [true, "please enter a last name"],
  },

  email: {
    type: String,
    required: [true, "please enter a email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email address"],
  },
  role: {
    type: String,
    required: [true, "please enter a role "],
    trim: true,
    enum: ["admin", "manager"],
  },
  userName: {
    type: String,
    required: [true, "please enter a user name"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: 10,
  },
  confirmPassword: {
    type: String,
    required: [true, "please enter a password to confirm"],
    validate: {
      validator: function (e) {
        return e === this.password; // abc === abc
      },
      message: "passwords must be the same",
    },
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare a password with the hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Usermodel", userSchema);
