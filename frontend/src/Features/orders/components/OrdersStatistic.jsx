import { Box } from "@mui/material";
import React from "react";

const OrdersStatistic = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        backgroundColor: "#fff",
        p: 1,
        borderRadius: 2,
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <h2>Orders Statistics</h2>
    </Box>
  );
};

export default OrdersStatistic;