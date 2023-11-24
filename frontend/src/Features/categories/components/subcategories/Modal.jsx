import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: " var(--border-radius)",
  p: 1,
  overflow: "scroll",
};

export default function SubCategoryModal(
  {
    //   handleCloseFormModal,
    //   isFormModalOpen,
  }
) {
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
        Add new Subcategory <AddBoxIcon></AddBoxIcon>
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
            <Form onClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}