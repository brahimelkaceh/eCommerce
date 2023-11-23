// ! MongoDB schema/model for subcategories

const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
    unique: true
  },
   categoryId: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'CategoryModel',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("SubCategoryModel", subCategorySchema);
