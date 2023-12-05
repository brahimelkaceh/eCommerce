import React from "react";
import Container from "../../Features/checkout/Container";
import CartContextStore from "../../Features/cart/components/State/CartContext";

const Checkout = () => {
  return (
    <CartContextStore>
      <Container />
    </CartContextStore>
  );
};

export default Checkout;
