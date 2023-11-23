import { isAuthenticad } from "./isAuthenticed";
import { Route, Navigate, Outlet } from "react-router-dom";

const ManagerRoutes = () => {
  return isAuthenticad() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
export default ManagerRoutes;

// export const UserRoute = () => {
//   return isAuth() ? (
//     <>
//       {" "}
//       <Navigate to="/dashboard" />{" "}
//     </>
//   ) : (
//     <Outlet />
//   );
// };
