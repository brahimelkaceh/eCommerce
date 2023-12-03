import React from "react";
import Container from "../../Features/shop/Container";
import { ProductProvider } from "../../Features/Products/Context";
import { SubcategoryProvider } from "../../Features/categories/Context";

const Shop = () => {
  return (
    <>
      <SubcategoryProvider>
        <ProductProvider>
          <Container />
        </ProductProvider>
      </SubcategoryProvider>
    </>
  );
};

export default Shop;
