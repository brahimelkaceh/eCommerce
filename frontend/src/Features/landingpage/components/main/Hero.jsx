import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      {/* <!-- slider-area --> */}
      <section className="home-seven-slider">
        <div className="h7-slider-active">
          <div
            className="h7-slider-item"
            style={{
              width: "100%",
              backgroundSize: "cover",
              backgroundImage: `url('/src/assets/img/slider/h7_slider_bg01.jpg')`,
            }}
          >
            <div className="container custom-container-two">
              <div className="h7-slider-wrap">
                <div className="row align-items-center">
                  <div className="col-xl-8 col-lg-8">
                    <div className="h7-slider-content">
                      <span
                        className="sub-title"
                        data-animation-in="fadeInUpBig"
                        data-delay-in=".2"
                        data-duration-in="1.5"
                      >
                        new arrival
                      </span>
                      <h2
                        className="title"
                        data-animation-in="fadeInUpBig"
                        data-delay-in=".4"
                        data-duration-in="1.5"
                      >
                        DISCOVER TIMELESS ELEGANCE <span>!</span>
                      </h2>
                      <p
                        data-animation-in="fadeInUpBig"
                        data-delay-in=".6"
                        data-duration-in="1.5"
                      >
                        Explore our curated collection of vintage treasures and
                        unique finds, embracing the nostalgia, distinctive
                        style, and unparalleled craftsmanship that define the
                        timeless allure of our carefully selected items.
                      </p>
                      <Link
                        to="/shop"
                        className="btn"
                        data-animation-in="fadeInUpBig"
                        data-delay-in=".8"
                        data-duration-in="1.5"
                      >
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- slider-area-end --> */}
    </div>
  );
};

export default Hero;
