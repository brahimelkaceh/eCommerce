import React from "react";
import Container from "../../Features/landingpage/Container";
import { ProductProvider } from "../../Features/Products/Context";
import { SubcategoryProvider } from "../../Features/categories/Context";

const LandingPage = () => {
  return (
    <SubcategoryProvider>
      <ProductProvider>
        <Container />
      </ProductProvider>
    </SubcategoryProvider>
  );
};

export default LandingPage;
