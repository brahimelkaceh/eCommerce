import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import DoneIcon from "@mui/icons-material/Done";
import { useSubCatData } from "../../Context";
import Swal from "sweetalert2";
const CreateForm = ({ onClose }) => {
  const { createCat, categoryError, setRefresh } = useSubCatData();
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      active: false,
    },
    validationSchema: yup.object({
      categoryName: yup.string().required("Subcategory Name is required"),
      active: yup.boolean(),
    }),
    onSubmit: (values) => {
      createCat(values)
        .then((response) => {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.error("Error occurred: while creating user", error);
        });
      setRefresh(new Date().toISOString());
    },
  });
  return (
    <Box
      m="20px"
      sx={{
        position: "relative",
      }}
    >
      <h1 className="main-title">add new Category</h1>
      <span
        style={{
          color: "red",
        }}
      >
        {categoryError}
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Box
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        >
          <TextField
            id="categoryName"
            name="categoryName"
            label="Subcategory Name"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryName && Boolean(formik.errors.categoryName)
            }
            helperText={
              formik.touched.categoryName && formik.errors.categoryName
            }
          />
          <Box sx={{ gridColumn: "span 2" }}></Box>

          <FormGroup>
            <FormControlLabel
              id="active"
              name="active"
              control={<Switch defaultChecked color="warning" />}
              label="Status"
              checked={formik.values.active}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </Box>

        <Box
          sx={{
            position: "fixed",
            left: "95%",
            top: "95%",
            transform: "translate(-100% , -100%)",
          }}
        >
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
    </Box>
  );
};

export default CreateForm;
