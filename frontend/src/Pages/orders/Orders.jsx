import React from "react";
import Container from "../../Features/orders/Container";
import { DataProvider } from "../../Features/orders/Context";
const Orders = () => {
  return (
    <DataProvider>
      <Container />
    </DataProvider>
  );
};

export default Orders;
