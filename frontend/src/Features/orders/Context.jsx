// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "./Services";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await fetchData("/orders");
        const orderssWithId = responseData.response.data.map((order) => ({
          ...order,
          id: order._id,
        }));
        console.log(responseData);
        console.log(orderssWithId);
        setData(orderssWithId);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const values = {
    data,
    loading,
    error,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
