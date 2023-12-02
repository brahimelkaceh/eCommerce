import React from "react";
import Container from "../../Features/Products/productDetails/Container";
import { ProductProvider } from "../../Features/Products/Context";

const SingleProduct = () => {
  return (
    <ProductProvider>
      <Container />
    </ProductProvider>
  );
};

export default SingleProduct;
