// ! MongoDB schema/model for subcategories

const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryID: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("SubCategoryModel", subCategorySchema);
