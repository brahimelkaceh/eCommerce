import React from "react";
import Container from "../../Features/landingpage/Container";
import { ProductProvider } from "../../Features/Products/Context";
import { SubcategoryProvider } from "../../Features/categories/Context";
import { CustomerProvider } from "../../Features/customers/Context";

const LandingPage = () => {
  return (
    <CustomerProvider>
      <SubcategoryProvider>
        <ProductProvider>
          <Container />
        </ProductProvider>
      </SubcategoryProvider>
    </CustomerProvider>
  );
};

export default LandingPage;
