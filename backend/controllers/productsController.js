const Products = require("../models/Products");
const catchAsync = require("../helpers/catchAsync");
const CONSTANTS = require("../config/constants");

exports.createProduct = catchAsync(async (req, res) => {
  // This isn't finished yet because you need options in database instead of color and size
  // you should to know how to  handle multer in product
  const response = {};
  try {
    const { subCategoryID, categoryId, productName } = req.body;
    const Product = await Products.findOne({ productName: productName });
    if (Product) {
      response.message = CONSTANTS.PRODUCT_NAME_EXISTED;
      response.status = CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE;
      return res.json({ response });
    }
    if (req.body.quantity) {
      req.body.availability = "In Stock";
    } else {
      req.body.availability = "Out of Stock";
    }

    const NewProduct = await Products.create({
      categoryID: categoryId,
      subCategoryID: subCategoryID,
      ...req.body,
    });
    if (NewProduct) {
      response.message = CONSTANTS.PRODUCT_CREATED;
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    } else {
      response.message = CONSTANTS.PRODUCT_CREATED_FAILED;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
    return res.json({ response });
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
});
exports.getAllProducts = catchAsync(async (req, res) => {
  const response = {};
  try {
    const products = await Products.find().limit(10);
    console.log(products);
    if (products) {
      response.message = CONSTANTS.PRODUCTS_FOUND;
      response.status = CONSTANTS.SERVER_FOUND_HTTP_CODE;
      response.data = products;
    } else {
      response.message = CONSTANTS.PRODUCTS_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
    }
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});

// ! Search for Products
exports.searchProducts = catchAsync(async (req, res) => {
  const response = {};
  const { productName } = req.query;

  try {
    const product = await Products.findOne({
      productName: productName.toLowerCase(),
    });
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
exports.getProductById = catchAsync(async (req, res) => {
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
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
});
exports.updateProduct = catchAsync(async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const newProductData = req.body;
    await Products.updateOne({ _id: id }, { $set: newProductData });
    response.message = CONSTANTS.USER_UPDATED;
    response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
  } catch (err) {
    response.message = err.message;
    response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
  }
  return res.json({ response });
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
