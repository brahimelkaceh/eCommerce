import React from "react";
import Preloader from "./components/Preloader";
import ScrollTop from "./components/ScrollTop";
import Hero from "./components/main/Hero";
import CategorySlider from "./components/main/CategorySlider";
import CatArea from "./components/main/CatArea";
import Trending from "./components/main/Trending";
import NewArrival from "./components/main/NewArrival";
import DiscountArea from "./components/main/DiscountArea";
import PromoServices from "./components/main/PromoServices";
import Newsletter from "./components/main/Newsletter";
import CartContextStore from "../cart/components/State/CartContext";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/magnific-popup.css";
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
import "../../assets/css/fontawesome-all.min.css";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";

const Container = () => {
  console.log("Container home");
  return (
    <CartContextStore>
      <div>
        {/* Preloader */}
        <Preloader />
        {/* Scroll-top */}
        <ScrollTop />
        {/* Header-area */}
        <Header />
        {/* Main-area */}
        <Hero />
        {/* <CategorySlider /> */}
        <CatArea />
        <Trending />
        <NewArrival />
        <DiscountArea />
        <PromoServices />
        <Newsletter />
        {/* Footer-area */}
        <Footer />
      </div>
    </CartContextStore>
  );
};

export default Container;
