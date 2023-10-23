// ! MongoDB schema/model for customers
//  ! MongoDB schema/model for users
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "please enter a first name"],
  },
  lastName: {
    type: String,
    // required: [true, "please enter a last name"],
  },

  email: {
    type: String,
    // required: [true, "please enter a email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "plaese provide a valid email address"],
  },
  password: {
    type: String,
    // required: [true, "please enter a password"],
    minLength: 10,
  },
  confirmPassword: {
    type: String,
    // required: [true, "please enter a password to confirm"],
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
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

customerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Customermodel", customerSchema);
