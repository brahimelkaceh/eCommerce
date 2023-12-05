import React from "react";
import Header from "../landingpage/components/Header";
import Main from "./components/Main";
import Footer from "../landingpage/components/Footer";
import ScrollTop from "../landingpage/components/ScrollTop";
import Preloader from "../landingpage/components/Preloader";
import CartContextStore from "../cart/components/State/CartContext";

const Container = () => {
  return (
    <>
      <CartContextStore>
        {/* Preloader */}
        <Preloader />
        {/* scroll-top */}
        <ScrollTop />
        {/* Header */}
        <Header />
        {/* Main */}
        <Main />
        {/* Footer */}
        <Footer />
      </CartContextStore>
    </>
  );
};

export default Container;
