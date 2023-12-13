/* eslint-disable no-useless-catch */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { deleteP, editP, getP } from "../Services";
import { useProduct } from "../Context";
import Swal from "sweetalert2";
import EditProductModal from "./edit/EditProductModal";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Chip, Typography } from "@mui/material";
import Loader from "../../../Components/loader/Loader";

export default function AllProducts() {
  const { products, loading } = useProduct();

  const [rows, setrows] = React.useState(products && products);
  const [rowModesModel, setrowsmodesmodel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [editingProductId, setEditingProductId] = React.useState(null);

  React.useEffect(() => {
    setrows(products);
  }, [products, setrows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setShowEditModal(true);
    setrowsmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setrowsmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setShowEditModal(false);
  };
  // sweatAlert
  const handleDeleteClick = (id) => async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteP(id).then((response) => {
            console.log(response);
          });
          setrows(rows.filter((row) => row.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      throw err;
    }
  };

  const handleCancelClick = (id) => () => {
    setrowsmodesmodel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setrows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      isNew: false,
    };
    setrows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const ID = updatedRow.id;
    delete updatedRow.isNew;
    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          console.log(updatedRow.images);
          editP(ID, { ...updatedRow, images: updatedRow.images })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              Swal.fire("Error occurred: while editing product", error);
              console.error("Error occurred: while editing product", error);
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      throw error;
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setrowsmodesmodel(newRowModesModel);
  };

  const columns = [
    {
      field: "_id",
      headerName: "Product ID",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            size="small"
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            #{params?.value.slice(-6)}
          </Typography>
        );
      },
    },
    {
      field: "images",
      headerName: "Product Image",
      renderCell: (params) => {
        return (
          <div
            style={{
              height: "4rem",
              width: "4rem ",
            }}
          >
            <img
              src={
                params.value
                  ? params?.formattedValue[0]
                  : "https://themesbrand.com/velzon/html/saas/assets/images/products/img-6.png"
              }
              alt="Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "productName",
      headerName: "Product Name",
      editable: true,
      flex: 1,
      renderCell: (params) => (
        <div className="product-name">
          <span className="name">{params.value}</span>
          <span className="subcategory">
            {params.row.subCategoryId.subCategoryName}
          </span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      editable: false,
      renderCell: (params) => {
        return (
          <Typography
            style={{
              textTransform: "capitalize",
              color: "#222",
            }}
          >{`$${params.row.options[0].price}`}</Typography>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Availability",
      editable: true,
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value > 0 ? "In Stock" : "Out of Stock"}
          size="small"
          style={{
            backgroundColor: params.value > 0 ? "#CFF8E0" : "#eee",
            textTransform: "capitalize",
            fontWeight: "bold",
            color: params.value > 0 ? "#1F8B24" : "#818181",
          }}
        />
      ),
    },

    {
      field: "subCategoryId",
      headerName: "Subcategory Name",
      flex: 1,
      type: "singleSelect",
      // valueOptions: subcategories,

      renderCell: (params) => {
        // console.log(params);
        const subCategoryName =
          typeof params.value === "object"
            ? params.value?.subCategoryName
            : params.value;

        return (
          <Chip
            label={subCategoryName}
            size="small"
            style={{
              color: "#0A3977",
              background: "transparent",
            }}
          />
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
      valueOptions: [true, false],
      type: "boolean",

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
      headerName: "Published",
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
              backgroundColor: "#C5DCFA",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#0A3977",
            }}
          ></Chip>
        );
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const rowMode = rowModesModel[id];

        if (rowMode) {
          const isInEditMode = rowMode.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "#11DD62",
                  backgroundColor: "#E7FCEF",
                }}
                onClick={handleSaveClick(id)}
                key={`${id}-save`}
              />,
              <GridActionsCellItem
                key={`${id}-cancel`}
                icon={
                  <CancelIcon
                    sx={{
                      color: "#E01E1E",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#FCE9E9",
                  color: "#E96262",
                }}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
        }

        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={
              <EditIcon
                sx={{
                  color: "#FCA119",
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={async () => {
              setOpen(true);
              setEditingProductId(id);
            }}
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              console.log("Deleting product with ID:", id);
              handleDeleteClick(id)();
            }}
            color="inherit"
            sx={{
              color: "#E33434",
            }}
          />,
        ];
      },
    },
  ];
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});
  return (
    <>
      {open && (
        <EditProductModal
          open={open}
          setOpen={setOpen}
          id={editingProductId}
        ></EditProductModal>
      )}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          backgroundColor: "#fff",
          p: 1,
          borderRadius: 2,
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        {loading && <Loader />}
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: GridToolbar,
          }}
          // slotProps={{
          //   toolbar: { setrows, setrowsmodesmodel, showQuickFilter: true },
          // }}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableColumnFilter
          disableDensitySelector
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
      </Box>
    </>
  );
}
