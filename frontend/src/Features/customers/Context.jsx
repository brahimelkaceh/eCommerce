
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomers } from "./service";
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(new Date().toISOString());
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const Response = await getCustomers();
        const formatDate = (dateString) => {
          const utcDate = new Date(dateString); // Original date in UTC
          return utcDate; // Convert to string in the desired format
        };
        console.log(Response.data.data);
        const customersWithId = Response.data.data.customers.map((customer) => ({
          ...customer,
          id: customer._id,
          creationDate: formatDate(customer.creationDate),
          lastLogin: formatDate(customer.lastLogin),
          lastUpdate: formatDate(customer.lastUpdate),
        }));

        setCustomers(customersWithId);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [refresh]);

  const customerContextValue = {
    customers,
    setCustomers,
    setRefresh,
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
