// ! Controller handling Categories-related logic
const catchAsync = require("../helpers/catchAsync");
const Category = require("../models/Categories");

exports.createCategory = catchAsync(async (req, res) => {
  const { categoryName, active } = req.body;

  // Check if a category with the same name already exists
  const existingCategory = await Category.findOne({ categoryName });

  if (existingCategory) {
    // If category with the same name exists, send a response indicating duplication
    return res
      .status(400)
      .json({ error: "Category with this name already exists." });
  }

  // If category with the same name doesn't exist, create and save the new category
  const newCategory = new Category({ categoryName, active });
  await newCategory.save();
  res.status(201).json(newCategory);
});

exports.getAllCategories = catchAsync(async (req, res) => {
  const myCategory = await Category.find({ active: true });
  res.status(200).json(myCategory);
});
// Get category by ID
exports.getCategoryById = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
});
