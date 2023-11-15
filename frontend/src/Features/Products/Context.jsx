import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        console.log(data)
        const productsWithId = data.data.map((product, index) => ({
          ...product,
          id: index + 1,
        }));
        setProducts(productsWithId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`
      );
      const data = await response.json();
      // console.log(data.data[0]);
      return data.data[0];
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return null;
    }
  };

  const addProduct = async (newProduct) => {
    console.log("new product", newProduct);
    axios
      .post("http://localhost:5000/products", newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
      });
    // try {
    //   const response = await fetch("http://localhost:5000/products", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newProduct),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Failed to add product: ${response.statusText}`);
    //   }

    //   const data = await response.json();

    //   setProducts((prevProducts) => [...prevProducts, data.data.product]);

    //   return data.data.product;
    // } catch (error) {
    //   console.error("Error adding product:", error);
    //   return null;
    // }
  };

  const editProduct = async (productId, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${productId}`, updatedProduct, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status !== 200) {
        throw new Error(`Failed to edit product: ${response.statusText}`);
      }

      const updatedData = response.data.data.product;

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedData } : product
        )
      );

      return updatedData;
    } catch (error) {
      console.error(`Error editing product with ID ${productId}:`, error);
      return null;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${productId}`);

      if (response.status !== 200) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      return false;
    }
  };

  const productContextValue = {
    products,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
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
