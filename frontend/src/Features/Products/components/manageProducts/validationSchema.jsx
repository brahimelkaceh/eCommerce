// validationSchema.js
import * as yup from "yup";

const validationSchema = yup.object({
  sku: yup.string().required("SKU is required"),
  productName: yup.string().required("Product Name is required"),
  subCategoryId: yup.string().required("Subcategory ID is required"),
  shortDescription: yup.string().required("Short Description is required"),
  longDescription: yup.string().required("Long Description is required"),
  image: yup.string(),
  discountPrice: yup.number().positive("Discount Price must be positive"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  options: yup.object().shape({
    // size: yup.string().required("Size is required"),
    // color: yup.string().required("Color is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive"),
    availability: yup.string().required("Availability is required"),
  }),
  active: yup.boolean(),
});

export default validationSchema;
