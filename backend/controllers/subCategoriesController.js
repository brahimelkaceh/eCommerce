// ! Controller handling subcategories-related logic
const catchAsync = require("../helpers/catchAsync");
const SubCategory = require('../models/subCategories');

// Get subcategory by ID
exports.getSubcategoryById = catchAsync(async (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const subcategory = await SubCategory.findById(subcategoryId);
  if (!subcategory) {
    return res.status(404).json({ message: 'Subcategory not found' }) ;
  }
  res.json(subcategory);
});
