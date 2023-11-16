import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "90%",
  bgcolor: "background.paper",
  // border: "2px solid #000",

  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function DetailsOrderModal({ handleClose, handleOpen, open }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
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
            <h4 className="main-title">ORDER DETAILS</h4>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
