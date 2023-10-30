<<<<<<< HEAD
// ! MongoDB schema/model for sub categories

const mongoose = require("mongoose");

// Define the ProductOptions schema for size and color
const productOptionsSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

=======
// ! MongoDB schema/model for products
// ! MongoDB schema/model for products
const mongoose = require("mongoose");

>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
// Define the Product schema
const productSchema = new mongoose.Schema({
  productImage: {
    type: String,
    required: true,
  },
  productName: {
<<<<<<< HEAD
    type: String,
=======
    type: String ,
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
    required: true,
  },

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: "categoryModel", // Reference to the Category model
=======
    ref: 'categoryModel', // Reference to the Category model
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
    required: true,
  },
  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: "SubCategoryModel", // Reference to the SubCategory model
=======
    ref: 'SubCategoryModel', // Reference to the SubCategory model
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
<<<<<<< HEAD
  },
  quantity: {
    type: Number,
    default: 0,
  },

  options: [productOptionsSchema], // Array of product options

=======
},
   quantity: {
    type: Number,
    default: 0,
  },
 // Array of product options
 size: {
    type: String,
  },
  color: {
    type: String,
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
  },
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
  active: {
    type: Boolean,
    default: true,
  },
<<<<<<< HEAD
});

module.exports = mongoose.model("ProductModel", productSchema);
=======

},{timestamps:true,versionKey:false});

module.exports = mongoose.model("ProductModel", productSchema);
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
