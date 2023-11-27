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

import { Chip } from "@mui/material";
import { useData } from "../Context";
import { useEffect } from "react";
import Loader from "../../../Components/loader/Loader";
import { useState } from "react";
import { useCustomer } from "../../../Features/customers/Context";

export default function AllOrders({ handleOpen }) {
  const { data, loading, error, getOrderById, updateOrder } = useData();
  const { getCustomerById, singleCustomer } = useCustomer();

  const [rows, setrows] = useState([]);
  const [customerId, setcustomer] = useState("");
  const [rowModesModel, setrowmodesmodel] = useState({});
  useEffect(() => {
    setrows(data);
  }, [data]);

  useEffect(() => {
    getCustomerById(customerId);
  }, [customerId]);

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
    // console.log(updatedRow);
    setrows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    delete updatedRow.isNew;
    updateOrder(updatedRow._id, updatedRow);
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
      width: 200,
    },
    {
      field: "orderItems",
      headerName: "Product",
      width: 120,

      renderCell: (params) => {
        return (
          <Chip
            label={
              params?.value?.length > 1
                ? params.value.length + " Products"
                : params.value.length + " Product"
            }
            size="small"
            // sx
            style={{
              backgroundColor: getColorBasedOnStatus(params.value),
            }}
          />
        );
      },
    },

    {
      field: "customerID",
      headerName: "Customer Name",
      align: "left",
      width: 120,

      headerAlign: "left",
      renderCell: (params) => {
        console.log(params.value?._id);
        setcustomer(params.value?._id);
        return (
          <span className="customer-name"> {singleCustomer?.userName}</span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,

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
      width: 120,

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
      width: 120,

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
      width: 100,

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
      width: 100,
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
            label="View"
            onClick={() => {
              handleOpen();
              getOrderById(id);
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
        className="dataGrid"
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
