import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getProfile } from "./Service";

const UserContext = createContext();

export const UserState = ({ children }) => {
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [refresh , setrefresh] = useState(new Date().toString())
  useEffect(() => {
    const fetchProfile = async () => {
      setloading(true);
      try {
        const response = await getProfile();
        console.log(response.data.data.role);
        setUserData(response.data?.data);
        setrole(response.data?.data.role);
        setloading(false);
      } catch (error) {
        console.error("Error fetching User Profile:", error);
        setloading(false);
      }
    };
    fetchProfile();
  }, [refresh]);

  return (
    <UserContext.Provider
      value={{
        username,
        setusername,
        role,
        setrole,
        loading,
        userData,
        setrefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserC = () => {
  const Context = useContext(UserContext);
  if (!Context) {
    throw new Error("no context provided");
  }
  return Context;
};
