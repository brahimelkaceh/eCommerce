import React, { useState } from "react";
import { useFormik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { useProduct } from "../Context";
import { createP } from "../Services";
import validationSchema from "./manageProducts/validationSchema";
import initialValues from "./manageProducts/InitialValues";
import { useSubCatData } from "../../categories/Context";
import { useTheme } from "@mui/material/styles";
import { VisuallyHiddenInput } from "../../../Components/mui/MuiStyles";

// Input styling

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, size, theme) {
  return {
    fontWeight:
      size?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProductForm = ({ open, onClose }) => {
  const theme = useTheme();
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["PINK", "PURPLE", "RED", "GREEN", "BLUE"];
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { addNewProduct, setRefresh } = useProduct();
  const { SubcatData } = useSubCatData();
  // SweatAlert
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        const optionsArray = [values.options];

        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            for (let i = 0; i < value.length; i++) {
              formData.append("images", value[i]);
            }
          } else if (key === "options") {
            optionsArray.forEach((option, index) => {
              Object.entries(option).forEach(([optionKey, optionValue]) => {
                formData.append(`options[${index}][${optionKey}]`, optionValue);
              });
            });
          } else {
            console.log("key", key, value);
            formData.append(key, value);
          }
        });
        console.log(formData);
        onClose();
        Swal.fire({
          title: "Do you want to create this product?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Create",
          denyButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await createP(formData);
              Swal.fire("Product Created!", "", "success");
              setRefresh(new Date().toISOString());
            } catch (error) {
              Swal.fire(
                "Error occurred while creating product",
                error.message,
                "error"
              );
              console.error("Error occurred while creating product", error);
            }
          } else if (result.isDenied) {
            Swal.fire("Product creation canceled", "", "info");
          }
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const [size, setSize] = useState(formik.values.options.size);
  const [color, setColor] = useState(formik.values.options.color);
  const handleDeleteImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };
  return (
    <Box
      m="20px"
      sx={{
        position: "relative",
      }}
    >
      <h1 className="main-title">add new Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
          console.log("submit");
        }}
      >
        <Box
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
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
          <Box sx={{ gridColumn: "span 2" }}></Box>

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
              id="subCategoryId"
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
          <Box sx={{ gridColumn: "span 2" }}></Box>

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

          <Box sx={{ gridColumn: "span 2" }}></Box>

          <TextField
            id="longDescription"
            name="longDescription"
            label="Long Description"
            multiline
            rows={4}
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
          <Box sx={{ gridColumn: "span 2" }}></Box>

          <TextField
            id="price"
            name="options.price"
            label="Price"
            variant="outlined"
            sx={{ gridColumn: "span 1" }}
            size="small"
            type="number"
            value={formik.values.options.price}
            onChange={formik.handleChange}
            // error={
            //   formik.touched.options.price &&
            //   Boolean(formik.errors.options.price)
            // }
            // helperText={
            //   formik.touched.options.price && formik.errors.options.price
            // }
          />

          <TextField
            id="discountPrice"
            name="discountPrice"
            label="Discount Price"
            variant="outlined"
            type="number"
            sx={{ gridColumn: "span 1" }}
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
          <Box sx={{ gridColumn: "span 2" }}></Box>

          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ gridColumn: "span 2" }}
          >
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              type="number"
              sx={{ gridColumn: "span 1" }}
              size="small"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />

            <FormControl sx={{ gridColumn: "span 1" }}>
              <Select
                multiple
                displayEmpty
                id="size"
                name="options.size"
                label="Size"
                variant="outlined"
                sx={{ gridColumn: "span 1" }}
                size="small"
                value={size}
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.handleChange(event);
                  const {
                    target: { value },
                  } = event;
                  setSize(typeof value === "string" ? value.split(",") : value);
                }}
                error={
                  formik.touched.options?.size &&
                  Boolean(formik.errors.options?.size)
                }
                helperText={
                  formik.touched.options?.size && formik.errors.options?.size
                }
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return <em>Size</em>;
                  }

                  return selected?.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Size</em>
                </MenuItem>
                {sizes?.map((size) => (
                  <MenuItem
                    key={size}
                    value={size}
                    style={getStyles(size, formik.values.options.size, theme)}
                  >
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ gridColumn: "span 1" }}>
              <Select
                multiple
                displayEmpty
                id="color"
                name="options.color"
                label="color"
                variant="outlined"
                sx={{ gridColumn: "span 1" }}
                size="small"
                value={color}
                onChange={(event) => {
                  formik.handleChange(event);
                  const {
                    target: { value },
                  } = event;
                  setColor(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                error={
                  formik.touched.options?.color &&
                  Boolean(formik.errors.options?.color)
                }
                helperText={
                  formik.touched.options?.color && formik.errors.options?.color
                }
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return <em>Color</em>;
                  }

                  return selected?.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Color</em>
                </MenuItem>
                {colors?.map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                    style={getStyles(color, formik.values.options.color, theme)}
                  >
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{ gridColumn: "span 1" }}
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
                <MenuItem value="Out of Stock">Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: "span 2" }}></Box>
          <FormGroup>
            <FormControlLabel
              id="active"
              name="active"
              control={<Switch defaultChecked color="warning" />}
              label="Publish"
              checked={formik.values.active}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "fit-content",
          }}
        >
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Images
            <VisuallyHiddenInput
              type="file"
              multiple
              name="images"
              onChange={(event) => {
                formik.setFieldValue("images", event.target.files);
              }}
            />
          </Button>
          {formik.values.images.length > 0 && (
            <div
              style={{
                display: "flex",
                width: "fit-content",
              }}
            >
              {Array.from(formik.values.images).map((file, index) => {
                console.log(file);
                return (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded Image ${index}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        margin: "5px",
                      }}
                    />
                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <CancelIcon></CancelIcon>
                    </IconButton>
                  </div>
                );
              })}
            </div>
          )}
        </Box>

        <Box
          sx={{
            position: "fixed",
            left: "99%",
            top: "98.5%",
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

export default ProductForm;
