import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import DataTable from "./components/ManagersDataTable";
import Forme from "./components/ManagersForm";
const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Managers</h1>
        <div>
          <DataTable />
        </div>
      </Box>
    </Box>
  );
};

export default Container;
