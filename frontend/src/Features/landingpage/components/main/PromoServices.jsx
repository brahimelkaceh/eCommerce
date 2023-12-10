import React from "react";
import promo_icon01 from "../../../../assets/img/icon/promo_icon01.png";
import promo_icon02 from "../../../../assets/img/icon/promo_icon02.png";
import promo_icon03 from "../../../../assets/img/icon/promo_icon03.png";
import promo_icon04 from "../../../../assets/img/icon/promo_icon04.png";
const PromoServices = () => {
  return (
    <main>
      <section className="promo-services pt-80 pb-35">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-8">
              <div className="promo-services-item mb-40">
                <div className="icon">
                  <img src={promo_icon01} alt />
                </div>
                <div className="content">
                  <h6>payment &amp; delivery</h6>
                  <p>Fast and free delivery</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-8">
              <div className="promo-services-item mb-40">
                <div className="icon">
                  <img src={promo_icon02} alt />
                </div>
                <div className="content">
                  <h6>Eco-Friendly Shopping</h6>
                  <p>Quality Assurance </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-8">
              <div className="promo-services-item mb-40">
                <div className="icon">
                  <img src={promo_icon03} alt />
                </div>
                <div className="content">
                  <h6>Money back guarantee</h6>
                  <p>Flexible Options</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-8">
              <div className="promo-services-item mb-40">
                <div className="icon">
                  <img src={promo_icon04} alt />
                </div>
                <div className="content">
                  <h6>Quality support</h6>
                  <p>24/7 Online Assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PromoServices;
