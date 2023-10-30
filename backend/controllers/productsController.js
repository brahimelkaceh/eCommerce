// ! Controller handling products-related logic
const catchAsync = require("../helpers/catchAsync");
const Product = require("../models/Products");

// Get product by ID
exports.getProductById = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

exports.searchproduct = async (req, res) => {
  try {
    const namee = req.query.query;
    const allproducts = await product
      .find({ productName: namee })
      .sort({ _id: "descending" })
      .limit(10);
    if (!allproducts.length) {
      res.json("subCategory not found"); // change this with constants
    } else {
      res.json({ data: allproducts });
      console.log(allproducts);
    }
  } catch (err) {
    throw err;
  }
};
