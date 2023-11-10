import React from "react";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
const Products = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h4>Products</h4>
      </Box>
    </Box>
  );
};

export default Products;
