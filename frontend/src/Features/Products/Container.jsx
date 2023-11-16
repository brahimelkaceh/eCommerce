import React, { useState } from "react";
import { ProductProvider } from "./Context";
import { SubcategoriesProvider } from "../categories/Context";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductsDetails";
import ProductL from "./components/ProductL";

const Container = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <ProductProvider>
      <div>
        {selectedProductId ? (
          <ProductDetails
            productId={selectedProductId}
            setSelectedProductId={handleProductClick}
          />
        ) : (
          // <ProductList onProductClick={handleProductClick} />
          <SubcategoriesProvider>
            <ProductList />
          </SubcategoriesProvider>
        )}
      </div>
    </ProductProvider>
  );
};

export default Container;
