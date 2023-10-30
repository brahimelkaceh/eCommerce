// ! MongoDB schema/model for products
const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  productImage: {
    type: String,
    required: true,
  },
  productName: {
    type: String ,
    required: true,
  },

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categoryModel', // Reference to the Category model
    required: true,
  },
  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategoryModel', // Reference to the SubCategory model
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
},
   quantity: {
    type: Number,
    default: 0,
  },
 size: {
    type: String,
  },
  color: {
    type: String,
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
  },
  active: {
    type: Boolean,
    default: true,
  },

},{timestamps:true,versionKey:false});

module.exports = mongoose.model("ProductModel", productSchema);