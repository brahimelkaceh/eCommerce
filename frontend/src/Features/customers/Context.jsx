import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomers } from "./service";
import { useNavigate } from "react-router-dom";
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(new Date().toISOString());
  const [customer, setCustomer] = useState([]);
  const [custTotal, setcustTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const Response = await getCustomers();
        const customersWithId = Response.data.data.customers.map(
          (customer) => ({
            ...customer,
            id: customer._id,
          })
        );

        setCustomers(customersWithId);
        setcustTotal(customersWithId.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [refresh]);

  const getCustomerById = async (customerId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/customers/${customerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("customerToken")
            )}`,
          },
        }
      );
      const data = await response.json();
      setCustomer(data?.data);
      setLoading(false);
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

      if (response?.status == 200) {
        localStorage.setItem("customerToken", JSON.stringify(data.token));
        localStorage.setItem("customerId", JSON.stringify(data?.data?._id));
        navigate("/customerProfile");
        return data;
      } else {
        return data;
      }
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
    custTotal,
    loading,
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
