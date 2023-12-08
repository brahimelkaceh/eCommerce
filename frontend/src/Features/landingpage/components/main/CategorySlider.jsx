import React from "react";

const CategorySlider = () => {
  return (
    <main>
      <section className="h7-slider-bottom-product pt-20">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-md-6">
              <div className="h7s-bottom-item mb-20" >
                <img src="/src/assets/img/images/1.png"  alt="" />
                <div className="content">
                  <h5>
                    <a href="shop-sidebar.html">Homeware</a>
                  </h5>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="h7s-bottom-item mb-20">
                <img src="/src/assets/img/images/2.png" alt="" />
                <div className="content">
                  <h5>
                    <a href="shop-sidebar.html">Lifestyle</a>
                  </h5>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="h7s-bottom-item mb-20">
                <img src="/src/assets/img/images/3.png" alt="" />
                <div className="content">
                  <h5>
                    <a href="shop-sidebar.html">Accessories</a>
                  </h5>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="h7s-bottom-item mb-20">
                <img src="/src/assets/img/images/4.png" alt="" />
                <div className="content">
                  <h5>
                    <a href="shop-sidebar.html">Gifts</a>
                  </h5>
                  <a href="shop-sidebar.html" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategorySlider;
