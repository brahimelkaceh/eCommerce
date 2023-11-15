import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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
import { useData } from "../Context";
import { useEffect } from "react";
import Loader from "../../../Components/loader/Loader";

export default function AllOrders() {
  const { data, loading, error } = useData();
  console.log(data);

  const [rows, setrows] = React.useState([]);
  const [rowModesModel, setrowmodesmodel] = React.useState({});
  useEffect(() => {
    setrows(data);
  }, [data]);
  const getColorBasedOnStatus = (status) => {
    switch (status) {
      case "Open":
        return "#B7DFFB";
      case "Shipped":
        return "#FEECD1"; // Change this to the color you want for "shipped"
      case "Payed":
        return "#58B3F5"; // Change this to the color you want for "payed"
      case "Closed":
        return "#B8F5D0"; // Change this to the color you want for "closed"
      case "Canceled":
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
    setrowmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setrowmodesmodel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setrows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setrowmodesmodel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setrows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setrows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setrowmodesmodel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "orderItems",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => {
        return params.value?.map((prod) => (
          <Chip
            label={prod.product}
            size="small"
            // sx
            style={{
              backgroundColor: getColorBasedOnStatus(params.value),
            }}
          />
        ));
      },
    },

    {
      field: "customerID",
      headerName: "Customer Id",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      renderCell: (params) => {
        const dateObject = new Date(params.value);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formatted = dateObject.toLocaleDateString(undefined, options);

        return (
          <Chip
            label={formatted}
            size="small"
            style={{
              backgroundColor: "#C5F2C7",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#1F8B24",
            }}
          ></Chip>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      renderCell: (params) => {
        const dateObject = new Date(params.value);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formatted = dateObject.toLocaleDateString(undefined, options);

        return (
          <Chip
            label={formatted}
            size="small"
            style={{
              backgroundColor: "#FBF3D0",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#BF710F",
            }}
          ></Chip>
        );
      },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
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
      field: "cartTotalPrice",
      headerName: "Total price",
      renderCell: (params) => (
        <Chip
          label={"$" + params.value}
          size="small"
          // sx
          style={{
            backgroundColor: getColorBasedOnStatus(params.value),
          }}
        />
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      editable: true,
      type: "singleSelect",
      valueOptions: ["open", "Shipped", "Payed", "Closed", "Canceled"],
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
            icon={<RemoveRedEyeIcon />}
            sx={{
              color: "#0A3977",
            }}
            label="Delete"
            onClick={() => {
              console.log("show details");
            }}
            color="inherit"
          />,
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
    data && (
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setrows, setrowmodesmodel, showQuickFilter: true },
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
    )
  );
}
