// ! Controller handling subcategories-related logic
const catchAsync = require("../helpers/catchAsync");
const Subcategory = require("../models/SubCategories");
const Categories = require("../models/Categories");

exports.createSubCategory = catchAsync(async (req, res) => {
  const { subCategoryName, categoryId, active } = req.body;
  const existingSubcategory = await Subcategory.findOne({
    subCategoryName,
    categoryId,
  });
  if (existingSubcategory) {
    return res.status(400).json({
      error: "Subcategory with this name already exists in the category.",
    });
  }
  const newSubcategory = new Subcategory({
    subCategoryName,
    categoryId,
    active,
  });
  await newSubcategory.save();

  res.status(201).json({
    status: "success",
    data: newSubcategory,
  });
});

exports.getAllSubcategories = catchAsync(async (req, res) => {
  const { categoryName } = req.params;

  // Find the category document by name
  const category = await Categories.findOne({ categoryName });

  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }

  // Find all subcategories for the found category ID
  const subcategories = await Subcategory.find({ categoryId: category._id });

  if (subcategories.length == 0) {
    return res.json({ error: "Category is empty." });
  }

  res.status(200).json({
    status: "success",
    data: subcategories,
  });
});
