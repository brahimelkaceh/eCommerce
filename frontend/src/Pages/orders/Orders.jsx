import React from "react";
import Container from "../../Features/orders/Container";
import { DataProvider } from "../../Features/orders/Context";
import { ProductProvider } from "../../Features/Products/Context";
import { CustomerProvider } from "../../Features/customers/Context";
const Orders = () => {
  return (
    <DataProvider>
      <CustomerProvider>
        <Container />
      </CustomerProvider>
    </DataProvider>
  );
};

export default Orders;
