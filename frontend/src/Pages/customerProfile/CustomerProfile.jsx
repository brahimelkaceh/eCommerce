import React from "react";
import Container from "../../Features/customerProfile/Container";
import CartContextStore from "../../Features/cart/components/State/CartContext";
import { CustomerProvider } from "../../Features/customers/Context";

const CustomerProfile = () => {
  return (
    <CustomerProvider>
      <CartContextStore>
        <Container />
      </CartContextStore>
    </CustomerProvider>
  );
};

export default CustomerProfile;
