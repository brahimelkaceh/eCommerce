// ! MongoDB schema/model for categories

/* use another schema */
//  ! MongoDB schema/model for users
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("categoryModel", categorySchema);