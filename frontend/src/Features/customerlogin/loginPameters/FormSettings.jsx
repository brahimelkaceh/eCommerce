import * as Yup from "yup";

export const initialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  image: "",
};

export const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  image: Yup.mixed().test("fileSize", "Image size is too large", (value) => {
    if (!value) return true; // Allow empty value (no file selected)
    return value.size <= 1048576; // 1 MB
  }),
});
