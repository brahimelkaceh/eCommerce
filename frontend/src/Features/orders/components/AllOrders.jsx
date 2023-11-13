import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomDesk,
  randomQuantity,
  randomUnitPrice,
} from "@mui/x-data-grid-generator";

const initialRows = [
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["string 1", "string 2", "string 3 ", "string 4 "]),
    amount: randomUnitPrice(),
  },
];

export default function AllOrders() {
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
    { field: "product", headerName: "Product", editable: true },
    {
      field: "id",
      headerName: "Order Id",
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      editable: true,
    },
    {
      field: "name",
      headerName: "Customer Name",
      editable: true,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      type: "singleSelect",
      valueOptions: ["string 1", "string 2", "string 3 ", "string 4 "],
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
        minHeight: 560,
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
        slotProps={{
          toolbar: { setRows, setRowModesModel, showQuickFilter: true },
        }}
        disableColumnFilter
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
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
