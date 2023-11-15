import React, { createContext, useContext, useState, useEffect } from "react";

export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState([]);

 useEffect(() => {
   const fetchManagers = async () => {
     try {
       const response = await fetch("http://localhost:5000/getallusers");
       const data = await response.json();

       const formatDate = (dateString) => {
         const utcDate = new Date(dateString); // Original date in UTC
         return utcDate; // Convert to string in the desired format
       };

       const managersWithId = data.map((manager) => ({
         id : manager._id,
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
