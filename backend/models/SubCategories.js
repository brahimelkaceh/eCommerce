// ! MongoDB schema/model for subcategories
const mongoose = require("mongoose");
const ProductModel = require("./Products");
const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryModel",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

subCategorySchema.pre("remove", async function (next) {
  // Remove all products with this subcategory
  await ProductModel.deleteMany({ subCategoryId: this._id }).exec();
  next();
});

module.exports = mongoose.model("SubCategoryModel", subCategorySchema);
