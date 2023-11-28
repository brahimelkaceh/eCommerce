import * as yup from "yup";
// initialValues.js
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
};

// validationSchema.js
export const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userName: yup.string().required("User Name is required"),
});

export default initialValues;
