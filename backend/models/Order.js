const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerModel", // Reference to the Customer model
      required: true,
    },
    orderItems: [
      {
        product: { type: mongoose.Types.ObjectId },
        productName: { type: String },
        productPrice: { type: Number },
        productOption: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    firstName: {
      type: String
    },
        lastName: { type: String },
        address: { type: String },
        city: { type: String },
        postalZip: { type: String },
        phoneNumber: { type: String },
        email: { type: String },
        note: { type: String },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    cartTotalPrice: {
      type: Number,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Open", "Shipped", "Paid", "Closed", "Canceled"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrdersModel", orderSchema);
