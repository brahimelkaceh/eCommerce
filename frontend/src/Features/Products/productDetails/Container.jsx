import React, { useEffect } from "react";
import ScrollTop from "../../../Components/scrollTop/ScrollTop";
import Preloader from "../../../Components/preloader/Preloader";
import Footer from "../../../Components/footer/Footer";
import BreadCrumb from "./components/BreadCrump";
import Header from "../../../Components/header/Header";
import Main from "./components/Main";

const Container = () => {
  return (
    <div>
      {/* Prealoader */}
      <Preloader />
      {/* Scroll-top */}
      <ScrollTop />
      {/* Header */}
      <Header />

      {/* Main */}
      <BreadCrumb />

      <Main />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Container;
