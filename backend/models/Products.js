const mongoose = require("mongoose");

const productOptionsSchema = new mongoose.Schema({
  size: {
    type: String,
    // You might want to require these fields if they're always necessary.
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
    sku: {
      type: String,
      unique: true,
      required: true, // If SKU is always required, consider adding this.
    },
    productImage: {
      type: String,
      required: true, // Require product image URL
    },
    productName: {
      type: String,
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategoryModel",
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
      required: true, // Price should probably always be required.
    },
    images: {
      type: [String],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
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
