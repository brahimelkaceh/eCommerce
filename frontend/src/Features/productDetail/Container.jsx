import React from "react";
import Preloader from "../landingpage/components/Preloader";
import Header from "../landingpage/components/Header";
import ScrollTop from "../landingpage/components/ScrollTop";
import Footer from "../landingpage/components/Footer";
import Main from "./components/Main";
import Breadcrumb from "./components/Breadcrumb";



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
      <Breadcrumb/>
      
      <Main />
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Container;
