import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import Popup from "../components/PopupModel";

const roles = ["manager", "admin"];
const randomRole = () => {
  return randomArrayItem(roles);
};
const active = [true, false];
const randomActive = () => {
  return randomArrayItem(active);
};

const initialRows = [
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
  {
    id: randomId(),
    userName: randomTraderName(),
    lastName: randomTraderName(),
    firstName: randomTraderName(),
    email: randomEmail(),
    creationDate: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    lastUpdate: randomUpdatedDate(),
    role: randomRole(),
    active: randomActive(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, userName: "", role: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "userName" },
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function allManagers() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    setRows(rows.filter((row) => row.id !== id));
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

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "userName", headerName: "UserName", width: 180, editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      type: "date",
      width: 100,
      editable: true,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      type: "date",
      width: 100,
      editable: true,
    },
    {
      field: "lastUpdate",
      headerName: "Last Update",
      type: "date",
      width: 100,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["manager", "admin"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
      <Popup />
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
        slotProps={{
          toolbar: { setRows, setRowModesModel, showQuickFilter: true },
        }}
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
