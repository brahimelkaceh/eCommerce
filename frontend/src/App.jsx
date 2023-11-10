import React from "react";
import AdminDashboard from "./Pages/adminDashboard/AdminDashboard";
import Products from "./Pages/products/Products";
import Categories from "./Pages/categories/CategoriesContainer";
import Managers from "./Pages/managers/Managers";
import Customers from "./Pages/customers/Customers";
import Orders from "./Pages/orders/Orders";
import Profile from "./Pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<AdminDashboard />} />
      <Route path="/orders" exact element={<Orders />} />
      <Route path="/products" exact element={<Products />} />
      <Route path="/categories" exact element={<Categories />} />
      <Route path="/managers" exact element={<Managers />} />
      <Route path="/customers" exact element={<Customers />} />
      <Route path="/profile" exact element={<Profile />} />
    </Routes>
  );
};

export default App;
