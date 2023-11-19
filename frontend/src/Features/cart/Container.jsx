import React from "react";
import Preloader from "../landingpage/components/Preloader";
import Header from "../landingpage/components/Header";
import ScrollTop from "../landingpage/components/ScrollTop";
import Footer from "../landingpage/components/Footer";
import Main from "./components/Main";
import CartContextStore from "./components/State/CartContext";
const Container = () => {
  return (
    <div>
      {/* Prealoader */}
      <CartContextStore>
        <Preloader />
        {/* Scroll-top */}
        <ScrollTop />
        {/* Header */}
        <Header />
        {/* Main */}
        <Main />
        {/* Footer */}
        <Footer />
      </CartContextStore>
    </div>
  );
};

export default Container;
