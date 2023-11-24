import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditForm from "./EditForm";

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

export default function EditSubCategoryModal({
  //   handleCloseFormModal,
  //   isFormModalOpen,
  open,
  setOpen,
  id,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <EditForm id={id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}