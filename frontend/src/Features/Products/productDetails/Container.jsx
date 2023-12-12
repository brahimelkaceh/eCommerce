import React, { useEffect } from "react";
import ScrollTop from "../../../Components/scrollTop/ScrollTop";
import Preloader from "../../../Components/preloader/Preloader";
import Footer from "../../../Components/footer/Footer";
import BreadCrumb from "./components/BreadCrump";
import Header from "../../../Components/header/Header";
import Main from "./components/Main";
import CartContextStore from "../../cart/components/State/CartContext";
import { useProduct } from "../Context";
const Container = () => {
  const { loading } = useProduct();
  return (
    <div>
      {/* Prealoader */}
      {loading && <Preloader />}
      {/* Scroll-top */}
      {/* <ScrollTop /> */}
      <CartContextStore>
        {/* Header */}
        <Header />

        <BreadCrumb />

        {/* Main */}
        <Main />

        {/* Footer */}
        <Footer />
      </CartContextStore>
    </div>
  );
};

export default Container;
