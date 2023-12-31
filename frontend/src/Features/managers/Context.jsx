import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsers } from "./service";
export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState([]);
  const [refresh, setRefresh] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchManagers = async () => {
      setLoading(true);
      try {
        const Response = await getUsers();
        const formatDate = (dateString) => {
          const utcDate = new Date(dateString); // Original date in UTC
          return utcDate; // Convert to string in the desired format
        };
        const managersWithId = Response?.data?.map((manager) => ({
          ...manager,
          id: manager._id,
          creationDate: formatDate(manager.creationDate),
          lastLogin: formatDate(manager.lastLogin),
          lastUpdate: formatDate(manager.lastUpdate),
        }));
        setManagers(managersWithId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, [refresh]);

  const managerContextValue = {
    managers,
    setManagers,
    setRefresh,
    loading,
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
