import React, { createContext, useContext, useState, useEffect } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/customers");
        const customers_data = await response.json();
        console.log(customers_data.data.customers);
        const formatDate = (dateString) => {
          const utcDate = new Date(dateString); // Original date in UTC
          return utcDate; // Convert to string in the desired format
        };

        const customersWithId = customers_data.data.customers.map((customer) => ({
          id: customer._id,
          userName: customer.userName,
          lastName: customer.lastName,
          firstName: customer.firstName,
          email: customer.email,
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
  }, []);

  const customerContextValue = {
    customers,
    setCustomers,
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
