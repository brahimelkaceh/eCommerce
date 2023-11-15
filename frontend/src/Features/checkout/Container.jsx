import React from "react";
import Header from "../landingpage/components/Header";
import Main from "./components/Main";
import Footer from "../landingpage/components/Footer";
import ScrollTop from "../landingpage/components/ScrollTop";
import Preloader from "../landingpage/components/Preloader";

const Container = () => {
  return (
    <>
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
    </>
  );
};

export default Container;
