import React, { useMemo } from "react";
import { useFormik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { styled } from "@mui/system";
import { useProduct } from "../Context";
import validationSchema from "./manageProducts/validationSchema";
import initialValues from "./manageProducts/InitialValues";
import { useSubCatData } from "../../categories/Context";

// Input styling

const StyledCheckbox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ProductForm = ({ open, onClose }) => {
  const { addProduct } = useProduct();
  const { SubcatData } = useSubCatData();
  // console.log(SubcatData);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(formik.values);
        console.log("Formik values before submission:", values);

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          console.log(`Appending ${key}: ${value} to FormData`);
          formData.append(key, value);
        });

        // Append files to FormData
        if (values.images) {
          for (let i = 0; i < values.images.length; i++) {
            console.log(`Appending image ${i}: ${values.images[i].name}`);
            formData.append("images", values.images[i]);
          }
        }

        await addProduct(formik.values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      onClose();
    },
  });

  return (
    <Box m="20px">
      <h1 className="main-title">add new Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            id="productName"
            name="productName"
            label="Product Name"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={
              formik.touched.productName && Boolean(formik.errors.productName)
            }
            helperText={formik.touched.productName && formik.errors.productName}
          />
          <FormControl
            sx={{ gridColumn: "span 1" }}
            size="small"
            variant="outlined"
            error={
              formik.touched.options?.availability &&
              Boolean(formik.errors.options?.availability)
            }
          >
            <InputLabel id="availability-label">Subcategory</InputLabel>
            <Select
              labelId="availability-label"
              id="options.availability"
              name="subCategoryId"
              label="Subcategory"
              value={formik.values.subCategoryId}
              onChange={formik.handleChange}
              error={
                formik.touched.subCategoryId &&
                Boolean(formik.errors.subCategoryId)
              }
              helperText={
                formik.touched.subCategoryId && formik.errors.subCategoryId
              }
            >
              {SubcatData?.map((subCategory) => {
                return (
                  <MenuItem value={subCategory._id} key={subCategory._id}>
                    <em>{subCategory.subCategoryName}</em>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="sku"
            name="sku"
            label="SKU"
            variant="outlined"
            display="none"
            sx={{ gridColumn: "span 1" }}
            size="small"
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.touched.sku && Boolean(formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
          />

          <TextField
            id="shortDescription"
            name="shortDescription"
            label="Short Description"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
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
          <TextField
            id="longDescription"
            name="longDescription"
            label="Long Description"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
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
          <TextField
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            id="discountPrice"
            name="discountPrice"
            label="Discount Price"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.discountPrice}
            onChange={formik.handleChange}
            error={
              formik.touched.discountPrice &&
              Boolean(formik.errors.discountPrice)
            }
            helperText={
              formik.touched.discountPrice && formik.errors.discountPrice
            }
          />
          <TextField
            id="quantity"
            name="quantity"
            label="Quantity"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            id="options.size"
            name="options.size"
            label="Size"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
            value={formik.values.options.size}
            onChange={formik.handleChange}
            error={
              formik.touched.options?.size &&
              Boolean(formik.errors.options?.size)
            }
            helperText={
              formik.touched.options?.size && formik.errors.options?.size
            }
          />

          <TextField
            id="options.color"
            name="options.color"
            label="Color"
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
            size="small"
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
            sx={{ gridColumn: "span 2" }}
            size="small"
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
        </Box>
        <input
          id="images"
          name="images"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("images", event.currentTarget.files);
          }}
          multiple
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            className="submit-btn"
            style={{
              color: "var(--white-background)",
            }}
            variant="contained"
            onClick={() => console.log("Form values:", formik.values)}
          >
            Submit <DoneIcon></DoneIcon>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
