import React, { useState } from "react";
import ProductDetails from "./components/ProductsDetails";
import { Box } from "@mui/material";
import "./style.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { DrawerHeader } from "../../Components/mui/MuiStyles";
import ProductsModal from "./components/ProductsModal";
import AllProducts from "./components/AllProducts";
import { ProductProvider, useProduct } from "./Context";
import { SubcategoryProvider } from "../categories/Context";
import EditProductModal from "./components/edit/EditProductModal";

const Container = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" className="main-page" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <ProductProvider>
            <SubcategoryProvider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <h5>Products management</h5>

                <ProductsModal
                  handleCloseFormModal={handleCloseFormModal}
                  isFormModalOpen={isFormModalOpen}
                />
              </div>
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
            </SubcategoryProvider>
          </ProductProvider>
        </Box>
      </Box>
    </>
  );
};

export default Container;
