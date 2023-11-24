// ! Controller handling Categories-related logic
const Category = require("../models/Categories");
const Subcategory = require("../models/SubCategories");
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
      res.json({
        status: "success",
        data: newCategory.toObject({ getters: true }),
      });
    }
  } catch (err) {
    throw err;
  }
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const newUserData = req.body;

    // Ensure that the request body is not empty
    if (Object.keys(newUserData).length === 0) {
      return next(new AppError("Request body is empty", 400));
    }

    console.log(newUserData);

    const updatedProduct = await Category.findByIdAndUpdate(id, newUserData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the update
    });

    if (!updatedProduct) {
      return next(new AppError("Category not found", 404));
    }

    res.json({
      status: "success",
      data: updatedProduct.toObject({ getters: true }),
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(400).json({ message: "Category not found" });
  }
  await Subcategory.deleteMany({ categoryId: id });
  await Category.findByIdAndDelete(id);
  res.status(204).json({
    message: "Category and it's subcategories deleted successfully",
  });
});

exports.getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Category not found", 404));
  } else {
    const category = await Category.findOne({ _id: id });
    res.json({ status: "success", data: category.toObject({ getters: true }) });
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
      return next(new AppError("Category not found", 404));
    } else {
      res.json({
        status: "success",
        data: allCategories.map((p) => p.toObject({ getters: true })),
      });
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
    res.json({ data: Categories.map((p) => p.toObject({ getters: true })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
