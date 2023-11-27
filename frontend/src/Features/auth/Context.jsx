import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getProfile } from "./Service";

const UserContext = createContext();

export const UserState = ({ children }) => {
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      setloading(true);
      try {
        const response = await getProfile();
        console.log(response);
        setUserData(response.data?.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching User Profile:", error);
        setloading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setusername,
        role,
        setrole,
        loading,
        userData,
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
