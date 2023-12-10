import { Box, Button, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import AllOrders from "./components/AllOrders";
import { useState } from "react";
import DetailsOrderModal from "./components/DetailsOrderModal";
import "./style.css";
import { BarChart } from "../dashboard/charts/BarChart";
const Container = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <h5>Orders management</h5>
        </div>
        <DetailsOrderModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
        <Grid container spacing={2}>
          <Grid xs={7} item>
            <AllOrders handleOpen={handleOpen} />
          </Grid>
          <Grid xs={5} item>
            <Item
              style={{
                background: "#fff",
                width: "100%",
                height: "100%",
                padding: "7px",
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
                // marginTop: " 15px",
              }}
            >
              <BarChart />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Container;
