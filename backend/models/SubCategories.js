// ! MongoDB schema/model for subcategories
const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
   subCategoryName: {
    type: String,
    required: true,
  },
   categoryID: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'categoryModel',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
},{timestamps:true,versionKey:false});

module.exports = mongoose.model("SubCategoryModel", subCategorySchema);