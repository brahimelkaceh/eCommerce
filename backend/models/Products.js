const mongoose = require("mongoose");

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

const productSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategoryModel",
      required: true,
      index: true, // Index for subCategoryId lookup
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
      min: 0, // Ensure price is non-negative
    },
    images: {
      type: [String],
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0, // Ensure discountPrice is non-negative
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0, // Ensure quantity is non-negative
    },
    options: [productOptionsSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("ProductModel", productSchema);
