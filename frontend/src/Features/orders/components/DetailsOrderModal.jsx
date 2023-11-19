import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useData } from "../Context";
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
  p: 2,
};

export default function DetailsOrderModal({ handleClose, open }) {
  const { orderDetailsData } = useData();
  // console.log(orderDetailsData.orderItems);
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
            <div className="box-order-details-header">
              <h4 className="main-title">ORDER DETAILS</h4>
              <IconButton aria-label="close">
                <CloseIcon onClick={handleClose} sx={{ color: "#F5413D" }} />
              </IconButton>
            </div>
            <div className="box-order-id">
              <span>Order Id : #{orderDetailsData._id}</span>
            </div>
            <div className="products-details-container">
              {orderDetailsData.orderItems?.map((product) => {
                // console.log();
                return (
                  <div className="product-details">
                    <div className="product-details-title">
                      {product.product._id}
                    </div>
                    <div className="products-imgs">
                      {product.product?.images?.map((img) => (
                        <div className="product-details-img">
                          <img
                            src={img}
                            alt=""
                            width={"100px"}
                            height={"100%"}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="products-details-options-container">
                      {product?.product?.options?.map((option) => (
                        <div className="products-details-options">
                          <div className="option">
                            color : <span>{option?.color}</span>
                          </div>
                          <div className="option">
                            Size : <span>{option?.size}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="product-details-title">
                      <div className="quantity-option">
                        Quantity : <span>{product.product.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
