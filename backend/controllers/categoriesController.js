// ! Controller handling Categories-related logic
const catchAsync = require("../helpers/catchAsync");
const Category = require('../models/categories');

// Get category by ID
exports.getCategoryById = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});
