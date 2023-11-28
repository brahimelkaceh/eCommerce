import React from "react";
import Preloader from "../../Components/preloader/Preloader";
import ScrollTop from "../../Components/scrollTop/ScrollTop";
import Header from "../../Components/header/Header";
import BreadCrumb from "./components/BreadCrump";
import Main from "./components/Main";
import Footer from "../../Components/footer/Footer";

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
