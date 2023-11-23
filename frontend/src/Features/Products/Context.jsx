// In your ProductProvider file
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  // fetchProductData,
  // fetchProductById, // Added this import
  // updateProduct,
  // createProduct,
  deleteP,
  createP,
  editP,
  getProducts,
  getP,
} from "./Services";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(null);
  const [refresh, setRefresh] = useState(new Date().toISOString());

  const updateProducts = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const addNewProduct = async (productData) => {
    try {
      const addedProduct = await createP(productData)
        .then((res) => {
          console.log("responses", res);
        })
        .catch((err) => {
          console.log("err", err.message);
        });
      setProducts((prevData) => [...prevData, { ...addedProduct }]);
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  const editProduct = async (productId, updatedProduct) => {
    try {
      const updatedData = await editP(productId, updatedProduct);
      console.log(updatedData.data.data);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedData } : product
        )
      );
      return updatedData;
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteProductById = async (productId) => {
    console.log("enterd context ", productId);
    try {
      deleteP(productId)
        .then((res) => {
          console.log("responses", res);
        })
        .catch((err) => {
          console.log("err", err.message);
        });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      return false;
    }
  };

  const fetchProductByIdFromService = async (productId) => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return null;
    }
  };

  const fetchProductByIdAndUpdateState = async (productId) => {
    const product = await fetchProductByIdFromService(productId);
    if (product) {
      setProducts((prevProducts) => [...prevProducts, { ...product }]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("hello I am data",response.data);
        const productsWithId = response.data.data.map((product) => ({
          id: product._id,
          ...product,
          id: product._id,
        }));
        setProducts(productsWithId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [refresh]);

  const productContextValue = {
    products,
    addNewProduct,
    setNewProduct,
    editProduct,
    deleteProductById,
    fetchProductById: fetchProductByIdAndUpdateState,
    updateProducts,
    setRefresh,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
