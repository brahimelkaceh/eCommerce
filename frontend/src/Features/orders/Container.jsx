import { Box, Button, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import AllOrders from "./components/AllOrders";
import { useState } from "react";
import DetailsOrderModal from "./components/DetailsOrderModal";
const Container = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1 className="main-title">Orders List</h1>

        <DetailsOrderModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
        <Grid container spacing={2}>
          <Grid xs={9.5} item>
            <AllOrders handleOpen={handleOpen} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Container;
