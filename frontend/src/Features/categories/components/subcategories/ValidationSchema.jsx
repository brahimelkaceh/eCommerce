// validationSchema.js
import * as yup from "yup";

const validationSchema = yup.object({
  subCategoryName: yup.string().required("Subcategory Name is required"),
  categoryId: yup.string().required("Category is required"),
  active: yup.boolean(),
});

export default validationSchema;