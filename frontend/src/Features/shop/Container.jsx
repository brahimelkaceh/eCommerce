import React, { useState } from "react";
// import Preloader from "../../Components/preloader/Preloader";
import ScrollTop from "../../Components/scrollTop/ScrollTop";
import BreadCrumb from "./components/BreadCrump";
import Main from "./components/Main";
import Footer from "../../Components/footer/Footer";
import CartContextStore from "../cart/components/State/CartContext";
import Header from "../../Components/header/Header";
import Preloader from "../landingpage/components/Preloader";
const Container = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div>
      <CartContextStore>
        {/* Prealoader */}
        {loading && <Preloader />}
        {/* Scroll-top */}
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
