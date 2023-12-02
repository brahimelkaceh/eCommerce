import React from "react";
import discount from "../../../../assets/img/icon/discount_icon.png";
import discount_bg from "../../../../assets/img/bg/discount_bg.jpg";
const DiscountArea = () => {
  return (
    <main>
      <section
        className="discount-area discount-bg jarallax parallax-img"
        data-background={discount_bg}
        style={{ backgroundImage: "none" }}
        data-jarallax-original-styles={`background-image: url(${discount_bg})`}
      >
        <div className="container">
          <div className="row justify-content-center justify-content-lg-start">
            <div className="col-lg-6 col-md-10">
              <div className="discount-content text-center">
                <div className="icon mb-15">
                  <img src={discount} alt />
                </div>
                <span>STOCK IS LIMITED</span>
                <h2>
                  GRAB EXCITING DEALS AND SPECIAL PROMOS TODAY, DON’T MISS OUT
                  !!
                </h2>
                <a href="#" className="btn">
                  shop now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiscountArea;
