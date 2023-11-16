import React, { useState, useEffect } from "react";
import { Box, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarContainer,
  GridRowModes,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import ProductForm from "./ProductForm";
import { useProduct } from "../Context";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, productName: "", price: "", shortDescription: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "productName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const ProductList = () => {
  const { products, addProduct, getProductById, editProduct, deleteProduct } =
    useProduct();
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editModeRows, setEditModeRows] = useState(new Set());
  const [rows, setRows] = useState(products);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(
      products.map((product) => ({ ...product, isNew: false, id: product._id }))
    );
  }, [products]);

  useEffect(() => {
    setFormModalOpen(false);
  }, [selectedProductId]);

  const handleSaveClick = (id) => () => {
    setRowModesModel((prevRowModesModel) => ({
      ...prevRowModesModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleDeleteClick = (id) => async () => {
    console.log(id);
    await deleteProduct(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // const processRowUpdate = (newRow) => {
  //   if (newRow.isNew) {
  //     console.log("product new");
  //   } else {
  //     console.log("product edited");
  //   }
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      console.log("product new", newRow);

      // Assuming addProduct returns the newly added product
      const addedProduct = await addProduct(newRow);

      const updatedRow = { ...addedProduct, isNew: false };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow;
    } else {
      console.log("product edited", newRow);

      // Assuming editProduct returns the edited product
      const editedProduct = await editProduct(newRow.id, newRow);

      const updatedRow = { ...editedProduct, isNew: false };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = (id) => () => {
    setEditModeRows((prevEditModeRows) => new Set([...prevEditModeRows, id]));
  };

  const handleCancelClick = (id) => () => {
    setEditModeRows(
      (prevEditModeRows) =>
        new Set([...prevEditModeRows].filter((rowId) => rowId !== id))
    );
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      setSelectedProductId(selectionModel[0]);
    }
  };

  const handleCellEditChange = (params) => {
    // No need to update the local state for inline editing in this context
    // The DataGrid will automatically update the edited cell value
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 210 },
    {
      field: "productName",
      headerName: "Product Name",
      editable: true,
      width: 200,
    },
    { field: "price", headerName: "Price", width: 80, editable: true },
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
        const { id } = params.row;
        const isInEditMode = editModeRows.has(id);

        return (
          <>
            {isInEditMode ? (
              <>
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  sx={{ color: "primary.main" }}
                  onClick={handleSaveClick(id)}
                />
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />
              </>
            ) : (
              <>
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />
              </>
            )}
          </>
        );
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
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onSelectionModelChange={handleRowSelectionChange}
        onCellEditChange={handleCellEditChange}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default ProductList;
