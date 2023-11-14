// ProductList.js
import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit, Save, Close, DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../Context";
import ProductForm from "./ProductForm";

const ProductList = ({ onProductClick }) => {
  const { products, getProductById } = useProduct();
  // console.log(products);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleOpenFormModal = () => {
    setFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
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
    { field: "sku", headerName: "ID", width: 100 },
    {
      field: "productName",
      headerName: "Product Name",
      editable: true,
    },
    { field: "price", headerName: "Price", width: 120, editable: true },
    {
      field: "shortDescription",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "details",
      headerName: "Details",
      width: 120,
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
    <Box sx={{ height: 400, width: "100%" }}>
      <Button onClick={handleOpenFormModal} variant="contained" color="primary">
        Create new product
      </Button>
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
      <ProductForm
        open={isFormModalOpen}
        onClose={handleCloseFormModal}
        // productId={selectedProductId}
      />
    </Box>
  );
};

export default ProductList;
