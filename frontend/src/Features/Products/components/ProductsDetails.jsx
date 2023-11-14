import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { DrawerHeader } from "../../../Components/mui/MuiStyles";
import { Box, Button } from "@mui/material";
import Sidebar from "../../../Components/sidebar/Sidebar";
import ProductItem from "./ProductItem";
import { useProduct } from "../Context";

function ProductsDetails({ productId, setSelectedProductId }) {
  const { id } = useParams();
  const { getProductById } = useProduct();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        console.log(fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error(error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productId, getProductById]);

  return (
    <Box sx={{ display: "flex", p: 3 }}>
      <Sidebar />
      <Box>
        <DrawerHeader />
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
         onClick={() => setSelectedProductId(null)}>
          Go to Products
        </Button>
        <h2>Details of Product: {product?.productName}</h2>
        {product ? (
          <ProductItem product={product} />
        ) : (
          <p>Product not found.</p>
        )}
      </Box>
    </Box>
  );
}

export default ProductsDetails;
