// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchSubcategoriesData,
  updateSubcategory,
} from "./SubCategorisServices";

const DataSubcategoriesContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const [SubcatData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const [orderDetailsData, setOrderDetailsData] = useState([]);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await fetchSubcategoriesData("");
        setData(responseData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);
  // const getOrderById = async (id) => {
  //   try {
  //     const fetchedOrder = await fetchOrderById(id);
  //     setOrderDetailsData(fetchedOrder.data);
  //   } catch (error) {
  //     console.error("Error fetching customer:", error);
  //   }
  // };
  const updateSubCat = async (id, updatedSubcategoryData) => {
    // console.log(updatedSubcategoryData);
    // return;
    try {
      const updatedOrder = await updateSubcategory(id, updatedSubcategoryData);
      console.log(updatedOrder);
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const values = {
    SubcatData,
    loading,
    error,
    // getOrderById,
    // orderDetailsData,
    updateSubCat,
    test: "test",
  };

  return (
    <DataSubcategoriesContext.Provider value={values}>
      {children}
    </DataSubcategoriesContext.Provider>
  );
};

export const useSubCatData = () => {
  return useContext(DataSubcategoriesContext);
};
