import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Loader from "../../../Components/loader/Loader";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { useSubCatData } from "../Context";
import { useEffect } from "react";
import { Chip, Typography } from "@mui/material";

export default function AllCategories() {
  const { catData, deleteCat, updateCat, setRefresh, loading } =
    useSubCatData();

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    setRows(catData);
  }, [catData]);
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Deleting this category will remove its subcategories and products permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCat(id).then((response) => {
            setRefresh(new Date().toISOString());
          });
          setRows(rows.filter((row) => row.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      throw err;
    }
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
          setRefresh(new Date().toString());
          Swal.fire("Saved!", "", "success");
          updateCat(updatedRow._id, updatedRow)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              Swal.fire("Error occurred: while editing user", error);
              console.error("Error occurred: while editing user", error);
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
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "Category Id",
      align: "center",
      headerAlign: "center",
      editable: false,
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
      field: "categoryName",
      headerName: "Category Name",
      // align: "center",
      editable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params?.value}
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
      field: "active",
      headerName: "Active",
      editable: true,
      flex: 1,
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      cellClassName: "actions",

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
            />,
            <GridActionsCellItem
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

        return [
          <GridActionsCellItem
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

  return (
    <Box
      sx={{
        // height: 500,
        width: "100%",
        position: "relative",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
      className="dashboard-card"
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
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 9 } },
        }}
      />
    </Box>
  );
}
