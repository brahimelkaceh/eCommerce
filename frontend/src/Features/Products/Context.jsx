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
  const [productName, setProductName] = useState("");
  const [refresh, setRefresh] = useState(new Date().toISOString());

  const updateProducts = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const addNewProduct = async (productData) => {
    console.log("enterd context ", productData);

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

  const fetchProductById = async (productId) => {
    try {
      const product = await getP(productId);
      setProductName(product.data.data?.productName);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const productsWithId = response.data.data.map((product) => ({
          ...product,
          id: product._id,
        }));
        // console.log("products : ", productsWithId); // !!!
        const filteredData = productsWithId.filter(
          (product) => product.subCategoryId.active == true
        );
        // console.log(" products updated : " ,filteredData)
        setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [refresh]);

  const discountPrice = (price, discountPrice) => {
    return price - ((discountPrice * price) / 100).toFixed(2);
  };

  const productContextValue = {
    products,
    addNewProduct,
    setNewProduct,
    editProduct,
    deleteProductById,
    fetchProductById,
    updateProducts,
    setRefresh,
    discountPrice,
    productName,
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
