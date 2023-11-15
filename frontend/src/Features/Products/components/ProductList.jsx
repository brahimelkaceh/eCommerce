// ProductList.js
import React, { useContext, useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit, Save, Close, DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../Context";
import ProductForm from "./ProductForm";

const ProductList = ({ onProductClick }) => {
  const { products, getProductById } = useProduct();
  console.log(products);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDeleteClick = (id) => {
    // Handle delete logic here
    console.log(`Delete product with id: ${id}`);
  };

  const handleSaveClick = (id) => {
    // Handle save logic here
    console.log(`Save product with id: ${id}`);
  };

  const handleCancelClick = (id) => {
    // Handle cancel logic here
    console.log(`Cancel edit for product with id: ${id}`);
  };

  const handleRowSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0];
      setSelectedProductId(selectedId);
    }
  };

  const handleRowClick = async (params) => {
    const { _id } = params.row;
    const product = await getProductById(_id);
    setSelectedProductId(_id);
  };

  const handleDetailsClick = async (id) => {
    try {
      onProductClick(id);
      const product = await getProductById(id);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "sku", headerName: "Sku" },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      editable: true,
    },
    { field: "price", headerName: "Price", editable: true, flex: 1 },
    {
      field: "discountPrice",
      headerName: "Discount Price",
      editable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value + "%"}
            size="small"
            style={{
              backgroundColor: "#C5DCFA80",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#0F56B3",
            }}
          ></Chip>
        );
      },
    },

    {
      field: "shortDescription",
      headerName: "Short Description",
      editable: true,
      width: 150,
    },
    {
      field: "longDescription",
      headerName: "Long Description",
      editable: true,
      width: 150,
    },
    {
      field: "active",
      headerName: "Status",
      editable: true,
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value === true ? "active" : "disabled"}
          size="small"
          style={{
            backgroundColor: params.value === true ? "#CFF8E0" : "#F9D2D2",
            textTransform: "capitalize",
            fontWeight: "bold",
            color: params.value === true ? "#1F8B24" : "#E64B4B",
          }}
        ></Chip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      editable: false,
      flex: 1,
      renderCell: (params) => {
        const dateObject = new Date(params.value);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formatted = dateObject.toLocaleDateString(undefined, options);

        return (
          <Chip
            label={formatted}
            size="small"
            style={{
              backgroundColor: "#E5E5E580",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#616161",
            }}
          ></Chip>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      editable: false,
      flex: 1,
      renderCell: (params) => {
        const dateObject = new Date(params.value);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formatted = dateObject.toLocaleDateString(undefined, options);

        return (
          <Chip
            label={formatted}
            size="small"
            style={{
              backgroundColor: "#C5DCFA80",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#0F56B3",
            }}
          ></Chip>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <GridActionsCellItem
            icon={<Save />}
            label="Details"
            onClick={() => handleDetailsClick(_id)}
            color="primary"
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const { _id } = params.row;
        const isInEditMode = params.row.isEditMode;

        if (isInEditMode) {
          return (
            <>
              <GridActionsCellItem
                icon={<Save />}
                label="Save"
                onClick={() => handleSaveClick(_id)}
                color="primary"
              />
              <GridActionsCellItem
                icon={<Close />}
                label="Cancel"
                onClick={() => handleCancelClick(_id)}
                color="primary"
              />
            </>
          );
        } else {
          return (
            <>
              <GridActionsCellItem
                icon={<Edit />}
                label="Edit"
                onClick={() => {
                  // Handle edit logic here
                  console.log(`Edit product with id: ${_id}`);
                }}
                color="primary"
              />
              <GridActionsCellItem
                icon={<DeleteOutlined />}
                label="Delete"
                onClick={() => handleDeleteClick(_id)}
                color="error"
              />
            </>
          );
        }
      },
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 500,
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        p: 1,
        borderRadius: 2,
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        editMode="row"
        onSelectionModelChange={handleRowSelectionChange}
        onCellClick={(params, event) => {
          // Ensure that only the cell (not the actions) triggers the click event
          if (event.target.tagName === "TD") {
            handleRowClick(params);
          }
        }}
      />
    </Box>
  );
};

export default ProductList;
