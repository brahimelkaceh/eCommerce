import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DeleteCustomer, editCustomer } from "../service";
import Swal from "sweetalert2";
import { useCustomer } from "../Context";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomArrayItem } from "@mui/x-data-grid-generator";
import { Avatar, Chip } from "@mui/material";

const active = [true, false];
const randomActive = () => {
  return randomArrayItem(active);
};

export default function allCustomers({ margin }) {
  const CustomerContext = useCustomer();

  const [rows, setrows] = React.useState([]);
  const [rowModesModel, setrowsmodesmodel] = React.useState({});
  React.useEffect(() => {
    setrows(CustomerContext.customers);
    console.log(CustomerContext.customers);
  }, [CustomerContext.customers]);
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
          DeleteCustomer(id).then((response) => {
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
          editCustomer(ID, updatedRow)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              Swal.fire("Error occurred: while editing Customer", error);
              console.error("Error occurred: while editing Customer", error);
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
    {
      field: "images",
      headerName: "Avatar",
      renderCell: (params) => {
        return (
          <Avatar
            src={
              params.value
                ? params?.formattedValue[0]
                : "https://themesbrand.com/velzon/html/saas/assets/images/products/img-6.png"
            }
          />
        );
      },
    },
    { field: "userName", headerName: "UserName", flex: 1, editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      align: "left",
      headerAlign: "left",
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
          />
        );
      },
    },

    {
      field: "active",
      headerName: "Status",
      editable: true,
      flex: 1,

      valueOptions: [true, false],
      type: "boolean",

      renderCell: (params) => (
        <Chip
          label={params.value === true ? "active" : "block"}
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
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      className="dataGrid"
      sx={{
        marginTop: margin && 0,
      }}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      disableColumnSelector={margin}
      slots={{
        toolbar: GridToolbar,
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 7 } },
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
  );
}
