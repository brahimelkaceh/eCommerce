import { Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import DataTable from "./components/ManagersDataTable";
import Forme from "./components/ManagersForm";
import Popup from "./components/PopupModel";
const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1 className="main-title">Managers list</h1>
        <div>
          <Popup />
          <DataTable />
        </div>
      </Box>
    </Box>
  );
};

export default Container;
