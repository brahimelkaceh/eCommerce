import React from 'react'

const DiscountArea = () => {
  return (
    <section className="discount-area pt-35">
      <div className="container custom-container-two">
        <div className="h9-discount-banner-wrap">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
              <div className="h9-discount-item mb-30">
                <div className="thumb">
                  <img src="img/product/h9_discount_banner01.jpg" alt="" />
                </div>
                <div className="content">
                  <span>breakfast</span>
                  <h4>
                    <a href="shop-sidebar.html">WINTER 2021 UP TO 50% OFF</a>
                  </h4>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
              <div className="h9-discount-item highlight-discount mb-30">
                <div className="thumb">
                  <img src="img/product/h9_discount_banner02.jpg" alt="" />
                </div>
                <div className="content">
                  <span>combo pack</span>
                  <h4>
                    <a href="shop-sidebar.html">combo 2021 UP TO 75% OFF</a>
                  </h4>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
              <div className="h9-discount-item mb-30">
                <div className="thumb">
                  <img src="img/product/h9_discount_banner03.jpg" alt="" />
                </div>
                <div className="content">
                  <span>new in</span>
                  <h4>
                    <a href="shop-sidebar.html">Baby Food UP TO 75% OFF</a>
                  </h4>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountArea