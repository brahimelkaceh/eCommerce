import React, { useState } from "react";
import { ProductProvider } from "./Context";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductsDetails";

const Container = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <ProductProvider>
      <div>
        {selectedProductId ? (
          <ProductDetails productId={selectedProductId} setSelectedProductId={handleProductClick}/>
        ) : (
          <ProductList onProductClick={handleProductClick} />
        )}
      </div>
    </ProductProvider>
  );
};

export default Container;
