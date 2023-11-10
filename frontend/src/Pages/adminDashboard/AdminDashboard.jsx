import React from "react";

import Grid from "@mui/material/Grid";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import { Box } from "@mui/material";
import LinearChart from "../../Components/charts/LinearChart";
import DashboardProductsList from "../../Features/Products/components/DashboardProductsList";
import PieChart from "../../Components/charts/PeiChart";
import Container from "../../Features/dashboard/Container";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container />
            </Grid>

            <Grid item xs={8}>
              <Box
                sx={{
                  height: "100%",
                  background: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <LinearChart />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  height: "100%",
                  background: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
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
                <PieChart />
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
                <LinearChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
