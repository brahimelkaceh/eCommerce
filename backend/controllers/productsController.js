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
  console.log("entered");
  try {
    const {
      sku,
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
    console.log("req.body", req.body);
    console.log("req.file", req.files);
    const subcategory = await SubCategory.findById(subCategoryId);
    if (!subcategory) {
      return next(
        new AppError("Can't find the corresponding subcategory", 404),
      );
    }

    // Handle image uploads here
    const images = req.files;
    const uploadedImages = await addImages(images);

    const newProduct = new Products({
      sku,
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

    await newProduct.save();

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
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
      data: products.map((p) => p.toObject({ getters: true })),
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
      return res.json({
        status: "success",
        data: product.toObject({ getters: true }),
      });
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

  try {
    const product = await Products.findById(id);

    if (!product) {
      return res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        status: "fail",
        message: CONSTANTS.PRODUCTS_NOT_FOUND,
      });
    }

    return res.status(CONSTANTS.SERVER_FOUND_HTTP_CODE).json({
      status: "success",
      message: CONSTANTS.PRODUCTS_FOUND,
      data: product.toObject({ getters: true }),
    });
  } catch (err) {
    next(new AppError(err.message, CONSTANTS.SERVER_ERROR_HTTP_CODE));
  }
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  try {
    const images = req.files;
    const uploadedImages = await addImages(images);
    const id = req.params.id;
    const newProductData = req.body;
    console.log(req.body);
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
    console.log(updatedProduct);
    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: updatedProduct.toObject({ getters: true }),
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const response = {};
  try {
    const { id } = req.params;
    const deleteProduct = await Products.findOneAndDelete({ _id: id });
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
