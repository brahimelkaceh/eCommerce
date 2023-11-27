import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import ProfileTabs from "./components/ProfilesTabs";
import "./style.css";
const Container = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <ProfileTabs />
      </Box>
    </Box>
  );
};

export default Container;
