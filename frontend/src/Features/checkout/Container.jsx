import React from "react";
import Main from "./components/Main";
import ScrollTop from "../landingpage/components/ScrollTop";
import Preloader from "../landingpage/components/Preloader";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
const Container = () => {
  return (
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
  );
};

export default Container;
