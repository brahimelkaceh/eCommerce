import React from "react";
import SliderArea from "../components/main/SliderArea";
import DiscountArea from "../components/main/DiscountArea";
import CatArea from "../components/main/CatArea";
import BlogArea from "../components/main/BlogArea";
import NewArrival from "../components/main/NewArrival";
import ReservationArea from "../components/main/ReservationArea";
import ChooseArea from "../components/main/ChooseArea";
const Main = () => {
  return (
    <main>
      {/* <!-- slider-area --> */}
      <SliderArea />
      {/* <!-- slider-area-end --> */}

      {/* <!-- discount-area --> */}
      <DiscountArea/>
      {/* <!-- discount-area-end --> */}

      {/* <!-- cat-area --> */}
      <CatArea/>
      {/* <!-- cat-area-end --> */}

      {/* <!-- choose-area --> */}
      <ChooseArea/>
      {/* <!-- choose-area-end --> */}

      {/* <!-- new-arrival-area --> */}
      <NewArrival/>
      {/* <!-- new-arrival-area-end --> */}

      {/* <!-- reservation-area --> */}
      <ReservationArea/>
      {/* <!-- reservation-area-end --> */}

      {/* <!-- blog-area --> */}
      <BlogArea/>
      {/* <!-- blog-area-end --> */}
    </main>
  );
};

export default Main;
