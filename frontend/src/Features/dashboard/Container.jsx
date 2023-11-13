import React from "react";
import Grid from "@mui/material/Grid";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import CardItem from "./components/cards/CardItem";
import LinearChart from "../../Components/charts/LinearChart";
import DashboardProductsList from "../../Features/Products/components/DashboardProductsList";
import PieChart from "../../Components/charts/PeiChart";
import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import Cards from "./components/cards/Cards";
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
            <Grid item xs={8}>
              <Box
                sx={{
                  height: "100%",
                  background: "#fff",
                  borderRadius: "var(--border-radius)",
                  width: "100%",
                  // height: "100%",
                  boxShadow: "var(--box-shadow)",
                }}
              >
                <LinearChart />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="dashboard-card">
                <DashboardProductsList />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: "100%",
                  background: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                {/* <PieChart /> */}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="dashboard-card">
                <LinearChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
