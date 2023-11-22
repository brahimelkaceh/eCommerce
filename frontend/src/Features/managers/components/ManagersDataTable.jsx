import * as React from "react";
import {useState} from "react"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DeleteUser, editUser } from "../service";
import { useManager } from "../Context";
import Swal from "sweetalert2";
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

export default function allManagers() {
  const ManagerContext = useManager();
  console.log(ManagerContext.managers)
  const [rows, setrows] = React.useState([]);
  const [rowModesModel, setrowsmodesmodel] = React.useState({});
  React.useEffect(() => {
    setrows(ManagerContext.managers);
  }, [ManagerContext.managers]);
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

  const handleDeleteClick = (id) => () => {
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
          DeleteUser(id).then((response) => {
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
      // DeleteUser(id).then((response) => {
      //   console.log(response);
      // });
      // setrows(rows.filter((row) => row.id !== id));
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
    delete updatedRow.password;
    delete updatedRow.confirmPassword;
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
          console.log(updatedRow);
          editUser(ID, updatedRow)
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
    console.log(updatedRow);
    console.log(updatedRow.id);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setrowsmodesmodel(newRowModesModel);
  };

  const columns = [
    { field: "userName", headerName: "UserName", editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      align: "left",
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      align: "left",
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      type: "date",
      flex: 1,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      type: "date",
      flex: 1,
    },
    {
      field: "lastUpdate",
      headerName: "Last Update",
      type: "date",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["manager", "admin"],
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: params.value === "admin" ? "#88EEB1" : "#88C9F8",
            textTransform: "capitalize",
          }}
        ></Chip>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
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
            // color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            sx={{
              color: "#E33434",
            }}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
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
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
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
  );
}
