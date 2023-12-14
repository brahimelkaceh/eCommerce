import React from "react";
import Grid from "@mui/material/Grid";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import Cards from "./components/Cards";
import "./style.css";
import { LinearChart } from "./charts/LinearChart";
import AllOrders from "../orders/components/AllOrders";
import AllCustomers from "../customers/components/CustomersDataTable";

import { ResponsivePie } from "@nivo/pie";
import { BarChart } from "./charts/BarChart";

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
              <Item
                sx={{
                  background: "#fff",
                  borderRadius: "var(--border-radius)",
                  width: "100%",
                  height: "400px",
                  boxShadow: "var(--box-shadow)",
                }}
              >
                <LinearChart />
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item
                sx={{
                  background: "#fff",
                  borderRadius: "var(--border-radius)",
                  width: "100%",
                  height: "100%",
                  boxShadow: "var(--box-shadow)",
                }}
              >
                {/* <PieChart /> */}
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
