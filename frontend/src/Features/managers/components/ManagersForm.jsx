import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import DoneIcon from "@mui/icons-material/Done";
import Swal from "sweetalert2";
import { createUser } from "../service";
import { useManager } from "../Context";
const initialValues = {
  firstName: "",
  lastName: "",
  role: "manager",
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
  images: "",
};
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  role: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  userName: yup.string().required("required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
const Formm = ({ open, onClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setRefresh } = useManager();
  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    try {
      createUser(values)
        .then((response) => {
          onClose();
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
          console.log(response);
          setRefresh(new Date().toISOString());
        })
        .catch((error) => {
          console.error("Error occurred: while creating user", error);
        });
      resetForm();
    } catch (err) {
      console.error("Error occurred during createUser:", error);
    }
  };

  return (
    <Box m="20px">
      <h1 className="main-title">add new manager</h1>
      <Formik
        onSubmit={(values, { resetForm }) =>
          handleFormSubmit(values, { resetForm })
        }
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          setFieldValue,
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                size="small"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helpertext={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={true}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helpertext={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helpertext={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                size="small"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helpertext={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                size="small"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helpertext={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                size="small"
                type="password"
                label="confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helpertext={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <Field
                name="images"
                render={({ field }) => (
                  <div>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      onChange={(event) => {
                        // console.log(values);
                        // console.log(event.target.files[0]);
                        setFieldValue("images", event.target.files[0]); // Set the image file directly
                      }}
                    />
                    <ErrorMessage name="images" component="div" />
                    {/* Display the uploaded image
                    {values.images && typeof values.images === "object" && (
                      <img
                        src={URL.createObjectURL(values.images)}
                        alt="Uploaded"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )} */}
                  </div>
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                className="submit-btn"
                style={{
                  color: "var(--white-background)",
                }}
                variant="contained"
              >
                Submit <DoneIcon></DoneIcon>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Formm;
