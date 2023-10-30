// ! MongoDB schema/model for subcategories
<<<<<<< HEAD

const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
=======
const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
   subCategoryName: {
    type: String,
    required: true,
  },
   categoryID: {
    type: String ,
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("SubCategoryModel", subCategorySchema);
=======
module.exports = mongoose.model("SubCategoryModel", subCategorySchema);
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
