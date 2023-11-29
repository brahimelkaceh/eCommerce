import React from "react";
import Container from "../../Features/shop/Container";
import { SubcategoryProvider } from "../../Features/categories/Context";
import { ProductProvider } from "../../Features/Products/Context";

const Shop = () => {
  return (
    <SubcategoryProvider>
      <ProductProvider>
        <Container />
      </ProductProvider>
    </SubcategoryProvider>
  );
};

export default Shop;
