import { Box, Grid } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader, Item } from "../../Components/mui/MuiStyles";
import AllCategories from "./components/AllCategories";
import AllSubcategories from "./components/AllSubcategories";
import SubCategoryModal from "./components/subcategories/Modal";
import CreateModal from "./components/categories/CreateModal";

const Container = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <h5>Categories management</h5>

                <CreateModal />
              </div>

              <AllCategories />
            </Grid>
            <Grid xs={6} item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <h5>Subcategories management</h5>

                <SubCategoryModal />
              </div>{" "}
              <AllSubcategories />
            </Grid>
          </Grid>
        </>
      </Box>
    </Box>
  );
};

export default Container;
