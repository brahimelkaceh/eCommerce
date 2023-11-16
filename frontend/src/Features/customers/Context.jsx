import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCustomerById } from "./Services";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const getCustomerById = async (id) => {
    try {
      const fetchedElement = await fetchCustomerById(id);
      setCustomers(fetchedElement.data.userName);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const customerContextValue = {
    customers,
    getCustomerById,
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
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
