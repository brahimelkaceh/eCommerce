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
      <Route path="/" element={<Adminroutes />}>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/managers" element={<Managers />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;