import React from "react";
import Preloader from "./components/Preloader";
import ScrollTop from "./components/ScrollTop";
import Header from "./components/Header";
import Main from "./components/Main";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/fontawesome-all.min.css";
import "../../assets/css/jquery.mCustomScrollbar.min.css";
import "../../assets/css/bootstrap-datepicker.min.css";
import "../../assets/css/swiper-bundle.min.css";
import "../../assets/css/jquery-ui.min.css";
import "../../assets/css/nice-select.css";
import "../../assets/css/jarallax.css";
import "../../assets/css/flaticon.css";
import "../../assets/css/slick.css";
import "../../assets/css/default.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

const Container = () => {
  return (
    <div>
      {/* Preloader */}
      <Preloader />
      {/* Scroll-top */}
      <ScrollTop />
      {/* Header-area */}
      <Header />
      {/* Main-area */}
      <Main />
    </div>
  );
};

export default Container;
