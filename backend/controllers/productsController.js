// ! Controller handling products-related logic
const product = require("../models/Products")
const catchAsync = require('../helpers/catchAsync')












exports.searchproduct = async (req, res) => {
    try {
      const namee = req.query.query;
      const allproducts = await product.find({ productName: namee })
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