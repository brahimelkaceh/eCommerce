const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerModel", // Reference to the Customer model
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
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
    enum: ['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'],
    default: 'Open', // Set the default status to "Open"
  },
},{timestamps:true});

module.exports = mongoose.model('OrdersModel', orderSchema);
