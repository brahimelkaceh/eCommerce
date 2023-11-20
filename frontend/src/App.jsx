import React from "react";
import AdminDashboard from "./Pages/adminDashboard/AdminDashboard";
import Products from "./Pages/products/Products";
import Categories from "./Pages/categories/Categories";
import Managers from "./Pages/managers/Managers";
import Customers from "./Pages/customers/Customers";
import Orders from "./Pages/orders/Orders";
import Profile from "./Pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
import LoginAdmin from "./Features/auth/Container";
import LandingPage from "./Pages/landingpage/LandingPage";
import Cart from "./Pages/cart/Cart";
import Checkout from "./Pages/checkout/Checkout";
import Login from "./Pages/auth/Login";
import Adminroutes from "./utils/adminRoutes";
const App = () => {
  return (
    <Routes>
      <Route element={<Adminroutes />}>
        <Route path="/" exact element={<AdminDashboard />} />
        <Route path="/orders" exact element={<Orders />} />
      </Route>

      <Route path="/login" exact element={<Login />} />
      <Route path="/products" exact element={<Products />} />
      <Route path="/categories" exact element={<Categories />} />
      <Route path="/managers" exact element={<Managers />} />
      <Route path="/customers" exact element={<Customers />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
