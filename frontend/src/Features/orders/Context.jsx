// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData, fetchOrderById } from "./Services";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await fetchData("/orders");
        const orderssWithId = responseData.data.map((order) => ({
          ...order,
          id: order._id,
        }));
        setData(orderssWithId);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);
  const getOrderById = async (id) => {
    try {
      const fetchedOrder = await fetchOrderById(id);
      // setCustomers(fetchedElement.data.userName);
      console.log(fetchedOrder.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };
  const values = {
    data,
    loading,
    error,
    getOrderById,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
