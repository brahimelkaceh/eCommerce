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
import ManagerRoutes from "./utils/ManagerRoutes";
import ProductDetails from "./Pages/productDetails/ProductDetails";
import Shop from "./Pages/shop/Shop";
const App = () => {
  return (
    <Routes>
      <Route element={<Adminroutes />}>
        <Route path="/" exact element={<AdminDashboard />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/products" exact element={<Products />} />
        <Route path="/categories" exact element={<Categories />} />
        <Route path="/managers" exact element={<Managers />} />
        <Route path="/customers" exact element={<Customers />} />
      </Route>

      <Route element={<ManagerRoutes />}>
        <Route path="/" exact element={<AdminDashboard />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/categories" exact element={<Categories />} />
      </Route>
      <Route path="/shop" exact element={<Shop />} />
      <Route path="/productDetails" exact element={<ProductDetails />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
