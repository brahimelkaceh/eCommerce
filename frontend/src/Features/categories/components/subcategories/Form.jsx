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
import initialValues from "./InitialValues";
import validationSchema from "./ValidationSchema";
import DoneIcon from "@mui/icons-material/Done";
import { useSubCatData } from "../../Context";
import Swal from "sweetalert2";
const Form = ({ onClose }) => {
  const { catData, createSubCat, setRefresh } = useSubCatData();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createSubCat(values)
        .then((response) => {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
          console.log(response);
          onClose();
          setRefresh(new Date().getMilliseconds());
        })
        .catch((error) => {
          console.error("Error occurred: while creating user", error);
        });
    },
  });
  return (
    <Box
      m="20px"
      sx={{
        position: "relative",
      }}
    >
      <h1 className="main-title">add new Subcategory</h1>
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
            id="subCategoryName"
            name="subCategoryName"
            label="Subcategory Name"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.subCategoryName}
            onChange={formik.handleChange}
            error={
              formik.touched.subCategoryName &&
              Boolean(formik.errors.subCategoryName)
            }
            helperText={
              formik.touched.subCategoryName && formik.errors.subCategoryName
            }
          />
          <Box sx={{ gridColumn: "span 2" }}></Box>

          <FormControl
            sx={{ gridColumn: "span 2" }}
            size="small"
            variant="outlined"
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
          >
            <InputLabel id="categoryId-label">Select Category</InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              label="Subcategory"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              error={
                formik.touched.categoryId && Boolean(formik.errors.categoryId)
              }
              helperText={formik.touched.categoryId && formik.errors.categoryId}
            >
              {catData?.map((cat) => {
                return (
                  <MenuItem value={cat._id} key={cat._id}>
                    <em>{cat.categoryName}</em>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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

export default Form;
