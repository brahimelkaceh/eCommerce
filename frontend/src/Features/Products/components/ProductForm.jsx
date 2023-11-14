import React from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import * as yup from "yup";
import { styled } from "@mui/system";

// Styled components for improved styling
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  zIndex: 100,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
}));

// Form styling
const StyledForm = styled("form")(({ theme }) => ({
  width: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  outline: "none",
}));

// Input styling
const StyledTextField = styled(TextField)(({ theme }) => ({
  //   marginBottom: theme.spacing(2),
  //   marginTop: theme.spacing(5),
  padding: theme.spacing(1),
}));

const StyledCheckbox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ProductForm = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      sku: "",
      productName: "",
      subCategoryId: "",
      shortDescription: "",
      longDescription: "",
      price: "",
      images: [],
      discountPrice: "",
      quantity: "",
      options: {
        size: "",
        color: "",
        availability: "In Stock",
      },
      active: false,
    },
    validationSchema: yup.object({
      sku: yup.string().required("SKU is required"),
      productName: yup.string().required("Product Name is required"),
      subCategoryId: yup.string().required("Subcategory ID is required"),
      shortDescription: yup.string().required("Short Description is required"),
      longDescription: yup.string().required("Long Description is required"),
      price: yup
        .number()
        .required("Price is required")
        .positive("Price must be positive"),
      discountPrice: yup.number().positive("Discount Price must be positive"),
      quantity: yup
        .number()
        .required("Quantity is required")
        .positive("Quantity must be positive"),
      options: yup.string().required("Options are required"),
      active: yup.boolean(),
    }),
  });

  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledTextField
          id="sku"
          name="sku"
          label="SKU"
          variant="outlined"
          fullWidth
          value={formik.values.sku}
          onChange={formik.handleChange}
          error={formik.touched.sku && Boolean(formik.errors.sku)}
          helperText={formik.touched.sku && formik.errors.sku}
        />
        <StyledTextField
          id="productName"
          name="productName"
          label="Product Name"
          variant="outlined"
          fullWidth
          value={formik.values.productName}
          onChange={formik.handleChange}
          error={
            formik.touched.productName && Boolean(formik.errors.productName)
          }
          helperText={formik.touched.productName && formik.errors.productName}
        />
        <StyledTextField
          id="subCategoryId"
          name="subCategoryId"
          label="Subcategory ID"
          variant="outlined"
          fullWidth
          value={formik.values.subCategoryId}
          onChange={formik.handleChange}
          error={
            formik.touched.subCategoryId && Boolean(formik.errors.subCategoryId)
          }
          helperText={
            formik.touched.subCategoryId && formik.errors.subCategoryId
          }
        />
        <StyledTextField
          id="shortDescription"
          name="shortDescription"
          label="Short Description"
          variant="outlined"
          fullWidth
          value={formik.values.shortDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.shortDescription &&
            Boolean(formik.errors.shortDescription)
          }
          helperText={
            formik.touched.shortDescription && formik.errors.shortDescription
          }
        />
        <StyledTextField
          id="longDescription"
          name="longDescription"
          label="Long Description"
          variant="outlined"
          fullWidth
          value={formik.values.longDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.longDescription &&
            Boolean(formik.errors.longDescription)
          }
          helperText={
            formik.touched.longDescription && formik.errors.longDescription
          }
        />
        <StyledTextField
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          fullWidth
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <input
          id="images"
          name="images"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("images", event.currentTarget.files);
          }}
          multiple
        />
        <StyledTextField
          id="discountPrice"
          name="discountPrice"
          label="Discount Price"
          variant="outlined"
          fullWidth
          value={formik.values.discountPrice}
          onChange={formik.handleChange}
          error={
            formik.touched.discountPrice && Boolean(formik.errors.discountPrice)
          }
          helperText={
            formik.touched.discountPrice && formik.errors.discountPrice
          }
        />
        <StyledTextField
          id="quantity"
          name="quantity"
          label="Quantity"
          variant="outlined"
          fullWidth
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />
        <StyledTextField
          id="options.size"
          name="options.size"
          label="Size"
          variant="outlined"
          fullWidth
          value={formik.values.options.size}
          onChange={formik.handleChange}
          error={
            formik.touched.options?.size && Boolean(formik.errors.options?.size)
          }
          helperText={
            formik.touched.options?.size && formik.errors.options?.size
          }
        />

        <StyledTextField
          id="options.color"
          name="options.color"
          label="Color"
          variant="outlined"
          fullWidth
          value={formik.values.options.color}
          onChange={formik.handleChange}
          error={
            formik.touched.options?.color &&
            Boolean(formik.errors.options?.color)
          }
          helperText={
            formik.touched.options?.color && formik.errors.options?.color
          }
        />

        <FormControl
          fullWidth
          variant="outlined"
          error={
            formik.touched.options?.availability &&
            Boolean(formik.errors.options?.availability)
          }
        >
          <InputLabel id="availability-label">Availability</InputLabel>
          <Select
            labelId="availability-label"
            id="options.availability"
            name="options.availability"
            label="Availability"
            value={formik.values.options.availability}
            onChange={formik.handleChange}
          >
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
          </Select>
        </FormControl>

        <StyledCheckbox>
          <Checkbox
            id="active"
            name="active"
            checked={formik.values.active}
            onChange={formik.handleChange}
            color="primary"
          />
          <Typography variant="body1">Active</Typography>
        </StyledCheckbox>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => console.log("Form values:", formik.values)}
        >
          Submit
        </Button>
      </StyledForm>
    </StyledModal>
  );
};

export default ProductForm;