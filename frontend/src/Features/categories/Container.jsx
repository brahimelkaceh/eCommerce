import { Box, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import AllCategories from "./components/AllCategories";
import AllSubcategories from "./components/AllSubcategories";

const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Categories management</h1>
        <>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <AllCategories />
            </Grid>
            <Grid xs={6} item>
              <AllSubcategories />
            </Grid>
          </Grid>
        </>
      </Box>
    </Box>
  );
};

export default Container;
