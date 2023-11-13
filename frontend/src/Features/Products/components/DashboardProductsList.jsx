import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function DashboardProductsList() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const initialState = React.useMemo(
    () => ({
      ...data.initialState,
      pagination: { paginationModel: { pageSize: 10 } },
    }),
    [data.initialState]
  );

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        {...data}
        slots={{ toolbar: GridToolbar }}
        initialState={initialState}
        experimentalFeatures={{ ariaV7: true }}
      />
    </div>
  );
}
