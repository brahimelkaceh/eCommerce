import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ImageIcon from "@mui/icons-material/Image";

import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useData } from "../Context";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  // border: "2px solid #000",

  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

export default function DetailsOrderModal({ handleClose, open }) {
  const { orderDetailsData } = useData();
  // console.log(orderDetailsData);
  const dateObject = new Date(orderDetailsData?.orderDate);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatted = dateObject.toLocaleDateString(undefined, options);
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="overline" gutterBottom>
                order #{orderDetailsData?._id?.slice(-6)}
              </Typography>
              <Chip label={formatted} size="small" variant="outlined" />
            </Box>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {orderDetailsData?.orderItems?.map((orderItem, i) => {
                // console.log();
                return (
                  <React.Fragment key={i}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={orderItem?.product?.images[0]}>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <Box>
                        <ListItemText
                          primary={orderItem?.product?.productName}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Quantity :
                              </Typography>
                              {orderItem?.quantity}
                            </React.Fragment>
                          }
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                          }}
                        >
                          <Typography variant="body2">
                            Item Price :{" "}
                            {orderItem?.product?.options?.map(
                              (option, i) => `$${option?.price}`
                            )}
                          </Typography>
                          <Typography variant="body2">
                            Total Amount :{" "}
                            {orderItem?.product?.options?.map(
                              (option, i) =>
                                `$${orderItem?.quantity * option?.price}`
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
