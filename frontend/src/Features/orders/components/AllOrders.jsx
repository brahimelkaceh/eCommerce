import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

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
import { Chip } from "@mui/material";

const initialRows = [
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
  {
    product: randomDesk(),
    id: randomId(),
    date: randomCreatedDate(),
    name: randomTraderName(),
    quantity: randomQuantity(),
    status: randomArrayItem(["open", "shipped", "payed", "closed", "canceled"]),
    amount: randomUnitPrice(),
  },
];

export default function AllOrders() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const getColorBasedOnStatus = (status) => {
    switch (status) {
      case "open":
        return "#B7DFFB";
      case "shipped":
        return "#FEECD1"; // Change this to the color you want for "shipped"
      case "payed":
        return "#58B3F5"; // Change this to the color you want for "payed"
      case "closed":
        return "#B8F5D0"; // Change this to the color you want for "closed"
      case "canceled":
        return "#F6BCBC";
      default:
        return "default"; // You can set a default color for unknown statuses
    }
  };

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
    { field: "product", headerName: "Product", editable: true, flex: 1 },
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
      flex: 1,
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
      valueOptions: ["open", "shipped", "payed", "closed", "canceled"],
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          // sx
          style={{
            backgroundColor: getColorBasedOnStatus(params.value),
          }}
        />
      ),
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
        minHeight: 560,
        width: "100%",
        "& .actions": {
          color: "red",
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
