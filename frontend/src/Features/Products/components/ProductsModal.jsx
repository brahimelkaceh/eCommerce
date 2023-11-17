import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";

import ProductForm from "./ProductForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: " var(--border-radius)",
  p: 1,
};

export default function ProductsModal({
  handleCloseFormModal,
  isFormModalOpen,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={handleOpen}
        style={{
          backgroundColor: "var(--blue-backround)",
          color: "var(--white-background)",
          marginBottom: "5px",
          alignSelf: "flex-end",
        }}
      >
        Add new Product <AddBoxIcon></AddBoxIcon>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ProductForm
              open={isFormModalOpen}
              onClose={handleCloseFormModal}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
