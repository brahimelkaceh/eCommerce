/* eslint-disable no-useless-catch */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { deleteP, editP } from "../Services";
import { useProduct } from "../Context";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomArrayItem } from "@mui/x-data-grid-generator";
import { Chip } from "@mui/material";

const roles = ["manager", "admin"];
const randomRole = () => {
  return randomArrayItem(roles);
};
const active = [true, false];
const randomActive = () => {
  return randomArrayItem(active);
};

export default function AllProducts({ handleOpen }) {
  const { products, getProductById, editProduct, deleteProductById } =
    useProduct();

  const [rows, setrows] = React.useState(products && products);
  const [rowModesModel, setrowsmodesmodel] = React.useState({});
  React.useEffect(() => {
    setrows(products);
  }, [products, setrows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setrowsmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setrowsmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    console.log("first entred", id);
    try {
      deleteP(id).then((response) => {
        console.log(response);
      });
      setrows(rows.filter((row) => row.id !== id));
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
      console.log(updatedRow.images);
      editP(ID, {...updatedRow, images: updatedRow.images[0]})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error occurred: while editing product", error);
        });
    } catch (error) {
      throw error;
    }
    // console.log(updatedRow);
    // console.log(updatedRow.id);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setrowsmodesmodel(newRowModesModel);
  };

  const columns = [
    { field: "_id", headerName: "Product ID", width: 150 },
    {
      field: "images",
      headerName: "",
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
      field: "quantity",
      headerName: "Availability",
      editable: true,
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value > 0 ? "in Stock" : "out stock"}
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
            ? params.value.subCategoryName
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
      type: "singleSelect",

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
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const rowMode = rowModesModel[id];
        // console.log(rowMode);
        // if (!rowMode) {
        //   // Handle the case where rowModesModel[id] is undefined
        //   return [];
        // }
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
                key={id}
              />,
              <GridActionsCellItem
                key={id}
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

          // ... rest of your code
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={
              <EditIcon
                sx={{
                  color: "#FCA119",
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
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
    <Box
      sx={{
        height: "100%",
        width: "100%",
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
  );
}
