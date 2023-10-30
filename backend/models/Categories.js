// ! MongoDB schema/model for categories

<<<<<<< HEAD
=======
/* use another schema */
//  ! MongoDB schema/model for users
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true,
=======
    trim: true,
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
  },
  active: {
    type: Boolean,
    default: true,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("categoryModel", categorySchema);
=======
module.exports = mongoose.model("categoryModel", categorySchema);
>>>>>>> 23c7db98080b7a9dca2945c27c26115c031d49d6
