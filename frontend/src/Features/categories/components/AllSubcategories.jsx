import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";
import { useSubCatData } from "../Context";
import { useEffect } from "react";
import { Chip } from "@mui/material";
import EditSubCategoryModal from "./subcategories/EditModal";

export default function AllSubcategories() {
  const {
    SubcatData,
    updateSubCat,
    getSubcategoryById,
    deleteSubCat,
    catData,
  } = useSubCatData();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [subcategoryId, setSubcategoryId] = React.useState(null);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const categories = catData.map((item) => item.categoryName);
  useEffect(() => {
    setRows(SubcatData);
  }, [SubcatData]);
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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
         deleteSubCat(id).then((response) => {
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
      width: 200,
    },
    {
      field: "subCategoryName",
      headerName: "Subcategory Name",
      align: "center",
      editable: true,
      width: 150,
    },
    {
      field: "categoryId",
      headerName: "Category Name",
      align: "center",
      width: 150,
      editable: false,
      // valueOptions: categories,
      type: "singleSelect",
      renderCell: (params) => {
        return <Chip label={params?.value?.categoryName}></Chip>;
      },
    },
    {
      field: "active",
      headerName: "Active",
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
            // onClick={handleEditClick(id)}
            onClick={() => {
              setOpen(true);
              setSubcategoryId(id);
              getSubcategoryById(id);
            }}
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
    <>
      {open && (
        <EditSubCategoryModal
          open={open}
          setOpen={setOpen}
          id={subcategoryId}
        />
      )}

      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
        className="dashboard-card"
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
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
}