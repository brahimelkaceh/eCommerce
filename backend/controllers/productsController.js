// ! Controller handling products-related logic
const catchAsync = require("../helpers/catchAsync");
const Product = require('../models/Products');

// Get product by ID
exports.getProductById = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});
