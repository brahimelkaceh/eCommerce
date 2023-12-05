import { customerAuthenticated } from "./isAuthenticed";
import { Route, Navigate, Outlet } from "react-router-dom";

const CustomerRoutes = () => {
  return customerAuthenticated() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/customerLogin" />
    </>
  );
};
export default CustomerRoutes;
