// ! MongoDB schema/model for categories

const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("categoryModel", categorySchema);
