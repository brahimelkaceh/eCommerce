// ! Controller handling subcategories-related logic
const Category = require('../models/Categories');
const subCategory = require('../models/SubCategories');
const catchAsync = require("../helpers/catchAsync");
const CONSTANTS = require('../config/constants');

exports.createSubCategory = catchAsync(async (req, res) => {
    const response = {};
    const { subCategoryName, category } = req.body;
    delete req.body.category;
    const CategoryData = await Category.findOne({ categoryName: category });
    if (!CategoryData) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return res.json({ response });
    }
    const subCategoryData = await subCategory.findOne({ subCategoryName: subCategoryName });
    if (subCategoryData) {
         response.message = "this subCategory name is already exists";
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return res.json({ response });
    }
    const NewSubCategory = await subCategory.create({ categoryID: CategoryData._id, ...req.body });
      if (NewSubCategory) {
        response.message = CONSTANTS.SUB_CATEGORY_CREATED;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    } else {
        response.message = CONSTANTS.SUB_CATEGORY_CREATED_FAILED;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
    }
    return res.json({ response });
    

})