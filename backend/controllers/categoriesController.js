// ! Controller handling Categories-related logic
const Category = require('../models/Categories');
const catchAsync = require("../helpers/catchAsync");
const CONSTANTS = require('../config/constants');

exports.createCategory = catchAsync(async (req, res) => {
     const response = {};
    const { categoryName } = req.body;
    const CategoryName = await Category.findOne({ categoryName })
    if (CategoryName) {
        response.message = "this category name is already exists";
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return res.json({ response });
    }
   const category =  await Category.create(req.body);
    if (category) {
        response.message = CONSTANTS.CATEGORY_CREATED;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    } else {
        response.message = CONSTANTS.CATEGORY_CREATED_FAILED;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
    return res.json({ response });
    

})