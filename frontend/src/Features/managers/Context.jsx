import React, { createContext, useContext, useState, useEffect } from "react";
import {getUsers} from "./service"
export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        // const response = await fetch("http://localhost:5000/users", {
        //   headers: {
        //     Authorization: ` Bearer ${JSON.parse(
        //       localStorage.getItem("userT")
        //     )}`,
        //   },
        // });
        const Response = await getUsers();
        // console.log("Hello",Response);
        // const data = await response.json();
        // console.log(data);
        const formatDate = (dateString) => {
          const utcDate = new Date(dateString); // Original date in UTC
          return utcDate; // Convert to string in the desired format
        };

        const managersWithId = Response.data.data.map((manager) => ({
          id: manager._id,
          userName: manager.userName,
          lastName: manager.lastName,
          firstName: manager.firstName,
          email: manager.email,
          creationDate: formatDate(manager.creationDate),
          lastLogin: formatDate(manager.lastLogin),
          lastUpdate: formatDate(manager.lastUpdate),

          role: manager.role,
        }));

        setManagers(managersWithId);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  const managerContextValue = {
    managers,
    setManagers,
  };

  return (
    <ManagerContext.Provider value={managerContextValue}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("manager must be used within a ProductProvider");
  }
  return context;
};
