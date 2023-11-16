import React, { useContext, useEffect, useState } from "react";
import { ProductContext, ProductProvider, useProduct } from "./Context";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductsDetails";
import { Box, Button } from "@mui/material";
import ProductL from "./components/ProductL";

import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import ProductsModal from "./components/ProductsModal";
const Container = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };
  const handleOpenFormModal = () => {
    setFormModalOpen(true);
  };
  const handleCloseFormModal = () => {
    setFormModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <ProductProvider>
          <ProductsModal
            handleCloseFormModal={handleCloseFormModal}
            isFormModalOpen={isFormModalOpen}
          />
          <div>
            {selectedProductId ? (
              <ProductDetails
                productId={selectedProductId}
                setSelectedProductId={handleProductClick}
              />
            ) : (
              <ProductList onProductClick={handleProductClick} />
            )}
          </div>
        </ProductProvider>
      </Box>
    </Box>
    // <ProductProvider>
    //   <div>
    //     {selectedProductId ? (
    //       <ProductDetails
    //         productId={selectedProductId}
    //         setSelectedProductId={handleProductClick}
    //       />
    //     ) : (
    //       // <ProductList onProductClick={handleProductClick} />
    //       <ProductList />
    //     )}
    //   </div>
    // </ProductProvider>
  );
};

export default Container;
