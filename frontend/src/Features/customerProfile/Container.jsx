import React from "react";
import ScrollTop from "../landingpage/components/ScrollTop";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import Main from "./components/Main";
import { useCustomer } from "../customers/Context";
import Preloader from "../../Components/preloader/Preloader";

const Container = () => {
  const { loading } = useCustomer();

  return (
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
  );
};

export default Container;
