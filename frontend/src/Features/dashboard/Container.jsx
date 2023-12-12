import React from "react";
import Grid from "@mui/material/Grid";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import Cards from "./components/Cards";
import AllOrders from "../orders/components/AllOrders";
import AllCustomers from "../customers/components/CustomersDataTable";
import { LinearChart } from "./charts/LinearChart";
import { BarChart } from "./charts/BarChart";
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Cards />
            <Grid container item xs={8}>
              <Item className="main-item ">
                <LinearChart />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item className="main-item ">
                <BarChart />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <AllOrders margin={true} />
            </Grid>
            <Grid item xs={6}>
              <AllCustomers margin={true} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
