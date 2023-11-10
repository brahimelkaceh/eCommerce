import React from "react";
import DashboardProductsList from "./components/DashboardProductsList";
import CreateProducts from "./components/CreateProducts";

const Container = () => {
  return (
    <div>
      Container for products
      <CreateProducts />
      <br />
      <DashboardProductsList />
    </div>
  );
};

export default Container;
