import { Box, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import AllOrders from "./components/AllOrders";
import OrdersStatistic from "./components/OrdersStatistic";
const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1 className="main-title">Orders List</h1>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <AllOrders />
          </Grid>
          {/* <Grid xs={5.5} item>
            <OrdersStatistic />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Container;
