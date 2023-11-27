import { Box } from "@mui/material";
import { ManagerProvider } from "./Context";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import DataTable from "./components/ManagersDataTable";
import Forme from "./components/ManagersForm";
import Popup from "./components/PopupModel";
const Container = () => {
  return (
    <ManagerProvider>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <h5>Managers management</h5>

              <Popup />
            </div>
            <DataTable />
          </div>
        </Box>
      </Box>
    </ManagerProvider>
  );
};

export default Container;
