const Products = require("../models/Products");
const catchAsync = require("../helpers/catchAsync");
const CONSTANTS = require("../config/constants");
const AppError = require("../helpers/appError");
const APIFeatures = require("./../helpers/apiFeatures");

const mongoose = require("mongoose");

const Category = require("../models/Categories");
const SubCategory = require("../models/SubCategories");
const { addImages } = require("../helpers/addImage");

exports.createProduct = catchAsync(async (req, res, next) => {
  const images = req.files;
  const uploadedImages = await addImages(images);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      sku,
      productImage,
      productName,
      subCategoryId, // Now you pass the subcategory ID
      shortDescription,
      longDescription,
      price,
      discountPrice,
      quantity,
      options, // Array of product options
      active,
    } = req.body;
    const subcategory = await SubCategory.findById(subCategoryId);
    if (!subcategory) {
      return next(
        new AppError("Can't find the corresponding subcategory", 404),
      );
    }
    const images = req.files;
    const newProduct = new Products({
      sku,
      productImage,
      productName,
      subCategoryId, // Pass the subcategory ID
      shortDescription,
      longDescription,
      price,
      images: uploadedImages.map((image) => image.imageUrl),
      discountPrice,
      quantity,
      options, // Pass the array of product options
      active,
    });

    await newProduct.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return next(new AppError(error.message, 400));
  }
});

exports.getAllProducts = async (req, res, next) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Products.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 404));
  }
};

// ! Search for Products
exports.searchProducts = catchAsync(async (req, res) => {
  const response = {};
  const searchParams = req.query;
  console.log(searchParams);
  try {
    const product = await Products.findOne(searchParams);
    if (product) {
      response.message = CONSTANTS.PRODUCTS_FOUND;
      response.message = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = product;
    } else {
      response.message = CONSTANTS.PRODUCTS_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  res.json({ response });
});
// ! Get The Product by id
exports.getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const response = {};
  try {
    const product = await Products.find({ _id: id });
    if (product) {
      response.message = CONSTANTS.PRODUCTS_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = product;
    } else {
      response.message = CONSTANTS.PRODUCTS_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
    }
    return res.json({ status: "success", data: product });
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    next(new AppError(err.message, 404));
  }
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  try {
    const images = req.files;
    const uploadedImages = await addImages(images);
    const id = req.params.id;
    const newProductData = req.body;
    console.log("newProductData.options: ", newProductData.options);
    // Ensure 'options' field is in the correct format
    if (newProductData.options && !Array.isArray(newProductData.options)) {
      return next(
        new AppError(
          "Invalid 'options' format. It should be an array of objects.",
          400,
        ),
      );
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        ...newProductData,
        images: uploadedImages.map((image) => image.imageUrl),
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators on update
      },
    );
    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const response = {};
  try {
    const { id } = req.params;
    const deleteProduct = await Products.deleteOne({ _id: id });
    if (deleteProduct) {
      response.message = CONSTANTS.PRODUCT_DELETED;
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    } else {
      response.message = CONSTANTS.PRODUCT_DELETE_FAILED;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }

  return res.json({ response });
});
