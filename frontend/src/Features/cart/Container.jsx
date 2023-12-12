import React, { useState } from "react";
import Preloader from "../landingpage/components/Preloader";
import ScrollTop from "../landingpage/components/ScrollTop";
import Main from "./components/Main";
import CartContextStore from "./components/State/CartContext";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
const Container = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div>
      {/* Prealoader */}
      <CartContextStore>
        {loading && <Preloader />} {/* Scroll-top */}
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
