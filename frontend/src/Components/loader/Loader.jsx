import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        left: "50%",
        top: "50%",
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
