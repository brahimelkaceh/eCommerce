import { Box } from "@mui/material";
import { CustomerProvider } from "./Context";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import DataTable from "./components/CustomersDataTable";
//import Forme from "./components/CustomersForm";
import CustomerPopup from "./components/CustomersPopupModel";
const Container = () => {
  return (
    <CustomerProvider>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <h1>Customers</h1>
          <div>
            <CustomerPopup />
            <DataTable />
          </div>
        </Box>
      </Box>
    </CustomerProvider>
  );
};

export default Container;
