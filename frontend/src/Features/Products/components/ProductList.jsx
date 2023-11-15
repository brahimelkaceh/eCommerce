import React, { useState, useEffect } from "react";
import { Box, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ProductForm from "./ProductForm";
import { useProduct } from "../Context";

const ProductList = ({ onProductClick }) => {
  const { products, getProductById, editProduct, deleteProduct } = useProduct();

  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editModeRows, setEditModeRows] = useState(new Set());

  useEffect(() => {
    // Close the form modal when switching to a different product
    setFormModalOpen(false);
  }, [selectedProductId]);

  const handleDeleteClick = async (id) => {
    try {
      const deletedProduct = await deleteProduct(id);

      if (!deletedProduct) {
        console.error(`Failed to delete product with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
    }
  };

  const handleEditClick = (id) => () => {
    setEditModeRows((prevEditModeRows) => new Set([...prevEditModeRows, id]));
  };

  const handleSaveClick = async (id) => {
    console.log(id);
    try {
      const originalProduct = await getProductById(id);

      const currentProduct = products.find((p) => p._id === id);

      if (!currentProduct) {
        console.error(`Product with ID ${id} not found in the products array.`);
        return;
      }

      // Log original and current product details
      console.log("Original Product:", originalProduct);
      console.log("Current Product:", currentProduct);

      // Log changes made by the user
      const changedFields = Object.keys(originalProduct).reduce(
        (changes, field) => {
          if (originalProduct[field] !== currentProduct[field]) {
            // Check if the field is an object (e.g., an image)
            if (
              typeof originalProduct[field] === "object" &&
              typeof currentProduct[field] === "object"
            ) {
              // Compare image URLs or other properties of the object as needed
              if (originalProduct[field].url !== currentProduct[field].url) {
                changes[field] = currentProduct[field];
              }
            } else {
              changes[field] = currentProduct[field];
            }
          }
          return changes;
        },
        {}
      );

      console.log("Changes made by the user:", changedFields);

      // Prepare the updated data object
      const updatedData = {
        ...originalProduct,
        ...changedFields,
      };

      console.log("Updated Data:", updatedData);

      const updatedProduct = await editProduct(id, updatedData);

      if (updatedProduct) {
        setEditModeRows(
          (prevEditModeRows) =>
            new Set([...prevEditModeRows].filter((rowId) => rowId !== id))
        );
      } else {
        console.error(`Failed to update product with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
    }
  };

  const handleCancelClick = (id) => () => {
    setEditModeRows(
      (prevEditModeRows) =>
        new Set([...prevEditModeRows].filter((rowId) => rowId !== id))
    );
  };

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      // Handle new row creation
    } else {
      // Handle row update
      await handleSaveClick(newRow._id);
    }

    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === "rowClick") {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0];
      setSelectedProductId(selectedId);
    }
  };

  const handleCellEditChange = (params) => {
    const { id, field, props } = params;

    // No need to update the local state for inline editing in this context
    // The DataGrid will automatically update the edited cell value
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "productName", headerName: "Product Name", editable: true },
    { field: "price", headerName: "Price", width: 120, editable: true },
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const { _id } = params.row;
        const isInEditMode = editModeRows.has(_id);

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${_id}`}
              icon={<SaveIcon />}
              label="Save"
              onClick={() => handleSaveClick(_id)}
              color="primary"
            />,
            <GridActionsCellItem
              key={`cancel-${_id}`}
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(_id)}
              color="primary"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${_id}`}
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(_id)}
            color="primary"
          />,
          <GridActionsCellItem
            key={`delete-${_id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(_id)}
            color="error"
          />,
        ];
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
        onEditCellChange={handleCellEditChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
 
    </Box>
  );
};

export default ProductList;
