import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function SuccessAlert() {
  return (
    <Stack
      sx={{ width: "100%", position: "reltive", top: "90%", left: "90%" }}
      spacing={2}
    >
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert>
    </Stack>
  );
}
