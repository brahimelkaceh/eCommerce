import React from "react";
import Main from "./components/Main";
import ScrollTop from "../landingpage/components/ScrollTop";
import Preloader from "../landingpage/components/Preloader";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import CartContextStore from "../cart/components/State/CartContext";
const Container = () => {
  return (
    <CartContextStore>
      <>
        {/* Preloader */}
        {/* <Preloader /> */}
        {/* scroll-top */}
        <ScrollTop />
        {/* Header */}
        <Header />
        {/* Main */}
        <Main />
        {/* Footer */}
        <Footer />
      </>
    </CartContextStore>
  );
};

export default Container;
