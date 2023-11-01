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

  // 2. Create a new subcategory
  const createdSubcategory = new Subcategory({
    subCategoryName,
    categoryId, // Associate the subcategory with the category
    active,
  });

  // 3. Start a MongoDB session to ensure data consistency
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 4. Save the subcategory within the session
    await createdSubcategory.save({ session });

    // 5. Commit the transaction to save the subcategory and end the session
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "success",
      data: { createdSubcategory },
    });
  } catch (error) {
    // Handle any errors that may occur during subcategory creation
    console.error(error);
    session.endSession(); // Roll back the transaction and end the session
    return next(new AppError("Can't add subcategory due to an error", 500));
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
  const subcategory = await Subcategory.findById(subcategoryId).populate(
    "categoryId"
  );

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
