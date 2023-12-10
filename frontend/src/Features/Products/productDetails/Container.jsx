import React, { useEffect } from "react";
import ScrollTop from "../../../Components/scrollTop/ScrollTop";
import Preloader from "../../../Components/preloader/Preloader";
import Footer from "../../../Components/footer/Footer";
import BreadCrumb from "./components/BreadCrump";
import Header from "../../../Components/header/Header";
import Main from "./components/Main";
import CartContextStore from "../../cart/components/State/CartContext";
const Container = () => {
  return (
    <div>
      {/* Prealoader */}
      {/* <Preloader /> */}
      {/* Scroll-top */}
      <CartContextStore>
        <ScrollTop />
        {/* Header */}
        <Header />

        {/* Main */}
        <BreadCrumb />

        <Main />

        {/* Footer */}
        <Footer />
      </CartContextStore>
    </div>
  );
};

export default Container;
