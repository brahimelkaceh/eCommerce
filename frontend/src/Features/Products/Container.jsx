import React, { useState } from "react";
import { ProductProvider } from "./Context";
import ProductDetails from "./components/ProductsDetails";
import { Box } from "@mui/material";
import "./style.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import ProductsModal from "./components/ProductsModal";
import AllProducts from "./components/AllProducts";
const Container = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
  };
  console.log("inside container");

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
              <AllProducts />
            )}
          </div>
        </ProductProvider>
      </Box>
    </Box>
  );
};

export default Container;
