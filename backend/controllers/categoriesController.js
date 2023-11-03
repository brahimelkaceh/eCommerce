// ! Controller handling Categories-related logic
const Category = require("../models/Categories");
const catchAsync = require("../helpers/catchAsync");
const SubCategory = require("../models/SubCategories");
const AppError = require("../helpers/appError");
const mongoose = require("mongoose");

exports.createCategory = catchAsync(async (req, res, next) => {
  try {
    const { categoryName, ...categoryData } = req.body;
    const CategoryData = await Category.findOne({ categoryName: categoryName });
    if (CategoryData) {
      res.json("category already exists");
    } else {
      const newCategory = new Category({
        ...categoryData,
        categoryName: categoryName.toLowerCase(),
      });
      console.log(newCategory);

      await newCategory.save();
      res.json({ status: "success", data: "category created successfully" });
    }
  } catch (err) {
    throw err;
  }
});

exports.updateCategory = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const newUserData = req.body;
    console.log(req.body);

    // const updateData = { ...newUserData };
    // console.log(updateData);
    await Category.updateOne({ _id: id }, { $set: newUserData });
    res.json({ status: "success", data: "category updated" });
  } catch (err) {
    throw err;
  }
});

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  const subCategory = await SubCategory.find({ categoryID: id });

  if (!subCategory.length) {
    try {
      const category = await Category.findByIdAndRemove(id);

      if (category) {
        res.json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.json("there is a subcategory for this category");
  }
};
exports.getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Category not found", 404));
  } else {
    const category = await Category.findOne({ _id: id });
    res.json({ status: "success", data: category });
  }
};

exports.searchCategory = async (req, res, next) => {
  const searchParams = req.query;
  console.log(searchParams);
  try {
    const allCategories = await Category.find(searchParams)
      .sort({ _id: "descending" })
      .limit(10);
    if (!allCategories.length) {
      return next(new AppError("Category not found", 404)); // change this with constants
    } else {
      res.json({ status: "success", data: allCategories });
      console.log(allCategories);
    }
  } catch (err) {
    next(new AppError(err.message, 404));
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const Categories = await Category.find()
      .sort({ _id: "descending" })
      .limit(10);
    res.json(Categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
