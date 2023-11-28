import { Box, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import AllCustomers from "./components/AllCustomers";
import CustomerCard from "./components/CustomerCard";

const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Customers </h1>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AllCustomers />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Container;
