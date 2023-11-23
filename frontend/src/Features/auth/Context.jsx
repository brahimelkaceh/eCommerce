import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserState = ({ children }) => {
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users/profile", {
      withCredentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${
          localStorage.getItem("userT") === null
            ? null
            : JSON.parse(localStorage.getItem("userT"))
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setusername(data.username);
        setrole(data.role);
        setloading(false);
      });
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
