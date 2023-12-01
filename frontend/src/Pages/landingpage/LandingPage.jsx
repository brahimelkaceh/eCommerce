import React from "react";
import Container from "../../Features/landingpage/Container";
import { ProductProvider } from "../../Features/Products/Context";

const LandingPage = () => {
  return (
    <ProductProvider>
      <Container />
    </ProductProvider>
  );
};

export default LandingPage;
