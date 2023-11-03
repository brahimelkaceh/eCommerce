// ! MongoDB schema/model for customers
const bcrypt = require("bcrypt");
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
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "customer",
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
  images: {
    type: [String],
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
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderModel",
    },
  ],
});

// customerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//
//   this.password = await bcrypt.hash(this.password, 12);
//
//   this.confirmPassword = undefined;
//   next();
// });
//
// customerSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword,
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

module.exports = mongoose.model("CustomerModel", customerSchema);
