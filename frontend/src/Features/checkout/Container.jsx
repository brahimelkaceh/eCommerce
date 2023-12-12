import React, { useState } from "react";
import Main from "./components/Main";
import ScrollTop from "../landingpage/components/ScrollTop";
import Preloader from "../landingpage/components/Preloader";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import CartContextStore from "../cart/components/State/CartContext";
const Container = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <CartContextStore>
      <>
        {/* Preloader */}
        {loading && <Preloader />}
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
