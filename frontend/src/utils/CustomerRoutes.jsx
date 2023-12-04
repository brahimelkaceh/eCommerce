import { isAuthenticad } from "./isAuthenticed";
import { Route, Navigate, Outlet } from "react-router-dom";

const CustomerRoutes = () => {
  return isAuthenticad() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/customerLogin" />
    </>
  );
};
export default CustomerRoutes;
