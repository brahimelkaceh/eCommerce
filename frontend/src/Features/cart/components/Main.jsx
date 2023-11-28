import React from "react";
import Cart from "./main/Cart";
import BreadCrumb from "./main/BreadCrumb";

const Main = () => {
  return (
    <main>
      {/* <!-- breadcrumb-area --> */}
      <BreadCrumb />
      {/* <!-- breadcrumb-area-end --> */}

      {/* <!-- cart-area --> */}
      <Cart />
      {/* <!-- cart-area-end --> */}
    </main>
  );
};

export default Main;
