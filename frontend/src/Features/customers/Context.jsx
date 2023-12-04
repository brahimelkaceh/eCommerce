import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomers } from "./service";
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(new Date().toISOString());
  const [customer, setCustomer] = useState("");
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const Response = await getCustomers();
        const formatDate = (dateString) => {
          const utcDate = new Date(dateString); // Original date in UTC
          return utcDate; // Convert to string in the desired format
        };
        // console.log(Response.data.data);
        const customersWithId = Response.data.data.customers.map(
          (customer) => ({
            ...customer,
            id: customer._id,
          })
        );

        setCustomers(customersWithId);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [refresh]);

  const getCustomerById = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/customers/${customerId}`
      );
      const data = await response.json();
      // console.log('customer: ', data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
    }
  };

  const loginCustomer = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      setCustomer(data);
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const customerContextValue = {
    customers,
    customer,
    setCustomers,
    setRefresh,
    getCustomerById,
    loginCustomer,
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
    throw new Error("customer must be used within a CustomerProvider");
  }
  return context;
};
