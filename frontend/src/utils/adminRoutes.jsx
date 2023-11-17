import { isAuthenticad } from "./isAuthenticed";
import { Route, Navigate, Outlet } from "react-router-dom";

const Adminroutes = () => {
  return isAuthenticad() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
export default Adminroutes;

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
