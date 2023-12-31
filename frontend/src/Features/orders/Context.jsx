// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData, fetchOrderById, updateOrderById } from "./Services";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  const [orderDetailsData, setOrderDetailsData] = useState([]);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      try {
        const responseData = await fetchData("");
        const orderssWithId = responseData.data.map((order) => ({
          ...order,
          id: order._id,
        }));
        setData(orderssWithId);
        setOrderTotal(orderssWithId?.length);
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
      setOrderDetailsData(fetchedOrder.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };
  const updateOrder = async (id, updatedOrderData) => {
    try {
      const updatedOrder = await updateOrderById(id, updatedOrderData);
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const values = {
    data,
    loading,
    error,
    getOrderById,
    orderDetailsData,
    updateOrder,
    orderTotal,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
