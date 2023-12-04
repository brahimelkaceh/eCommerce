import React from "react";
import Container from "../../Features/Products/productDetails/Container";
import { ProductProvider } from "../../Features/Products/Context";
import CartContextStore from "../../Features/cart/components/State/CartContext";

const SingleProduct = () => {
  return (
    <CartContextStore>
      <ProductProvider>
        <Container />
      </ProductProvider>
    </CartContextStore>
  );
};

export default SingleProduct;
