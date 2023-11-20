import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCustomerById, fetchData } from "./service";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [singleCustomer, setSingleCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const responseData = await fetchData("/");
      } catch (error) {
        setError(error);
      }
    };

    fetchCustomers();
  }, []);

  const getCustomerById = async (id) => {
    try {
      const Customer = await fetchCustomerById(id);
      setSingleCustomer(Customer.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };
  const customerContextValue = {
    customers,
    setCustomers,
    getCustomerById,
    singleCustomer,
  };

  return (
    <CustomerContext.Provider value={customerContextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("customer must be used within a ProductProvider");
  }
  return context;
};
