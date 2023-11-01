// ! MongoDB schema/model for products
const mongoose = require("mongoose");
// Define the ProductOptions schema for size and color
const productOptionsSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true, // Ensures SKU is unique for each product
      required: true,
    },

    productImage: {
      type: String,
      required: [true, "please enter this field"],
    },

    productName: {
      type: String,
      required: true,
    },

    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel", // Reference to the Category model
      required: true,
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategoryModel", // Reference to the SubCategory model
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

    options: [productOptionsSchema], // Array of product options
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("ProductModel", productSchema);
