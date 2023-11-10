import React from "react";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";

const Managers = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <h4>Managers</h4>
        </Box>
      </Box>
    </Box>
  );
};

export default Managers;
