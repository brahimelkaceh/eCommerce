import React from "react";

const BreadCrumb = () => {
  return (
    <div>
      <div
        className="breadcrumb-area breadcrumb-style-two"
        data-background="img/bg/s_breadcrumb_bg01.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="previous-product">
                <a href="shop-details.html">
                  <i className="fas fa-angle-left" /> previous product
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="breadcrumb-content">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="shop.html">Winter 20</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="shop.html">Women</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Tracker Jacket
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <div className="next-product">
                <a href="shop-details.html">
                  Next product <i className="fas fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
