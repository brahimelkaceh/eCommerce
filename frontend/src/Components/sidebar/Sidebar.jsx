import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../navbar/Navbar";
import Lists from "./Lists";
import { DrawerHeader, Drawer } from "../mui/MuiStyles";

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer
        PaperProps={{
          sx: {
            background: "#0D1F2D",
            color: "#FFFFFF",
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} color="inherit">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Lists open={open} />
        <Divider />
      </Drawer>
    </Box>
  );
};

export default React.memo(Sidebar);
