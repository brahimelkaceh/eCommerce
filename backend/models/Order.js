// ! MongoDB schema/model for orders
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the Customer model
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
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