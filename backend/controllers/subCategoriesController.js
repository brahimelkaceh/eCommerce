// ! Controller handling subcategories-related logic
const catchAsync = require("../helpers/catchAsync");
const Subcategory = require("../models/SubCategories");
const Category = require("../models/Categories");
const AppError = require("../helpers/AppError");
const mongoose = require("mongoose");

exports.createSubCategory = catchAsync(async (req, res, next) => {
  const { subCategoryName, categoryId, active } = req.body;

  // 1. Check if the specified category exists
  const category = await Category.findById(categoryId);

  if (!category) {
    return next(new AppError("Can't find this category", 404));
  }

  try {
    // 2. Create a new subcategory and save it
    const createdSubcategory = new Subcategory({
      subCategoryName,
      categoryId,
      active,
    });

    await createdSubcategory.save();

    res.status(201).json({
      status: "success",
      data: { createdSubcategory },
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, 500));
  }
});


exports.getAllSubcategories = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.json({
    status: "success",
    data: subcategories.map((sub) => sub.toObject({ getters: true })),
  });
};

exports.getSubCategoryById = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.id;

  // Find the subcategory by its ID
  const subcategory =
    await Subcategory.findById(subcategoryId).populate("categoryId");

  if (!subcategory) {
    return next(new AppError("Can't find the specified subcategory", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subcategory },
  });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.id;
  const { subCategoryName, active } = req.body;

  // Validate the request body
  if (!subCategoryName) {
    return next(new AppError("Please provide subcategory name", 400));
  }

  // Find the subcategory by its ID
  const subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    return next(new AppError("Can't find the specified subcategory", 404));
  }

  // Update the subcategory properties
  subcategory.subCategoryName = subCategoryName;
  subcategory.active = active || false; // Set to false if not provided

  // Save the updated subcategory
  await subcategory.save();

  res.status(200).json({
    status: "success",
    data: { subcategory },
  });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.id;

  // Find the subcategory by its ID and remove it
  const result = await Subcategory.deleteOne({ _id: subcategoryId });

  if (result.deletedCount === 0) {
    return next(new AppError("Can't find the specified subcategory", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
