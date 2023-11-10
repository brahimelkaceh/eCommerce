import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import AllOrders from "./components/AllOrders";
import CreateOrder from "./components/CreateOrder";
const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h4>Orders</h4>
        <div>
          <AllOrders />
          <CreateOrder />
        </div>
      </Box>
    </Box>
  );
};

export default Container;
