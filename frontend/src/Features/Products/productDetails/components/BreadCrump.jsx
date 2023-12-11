import React from "react";
import bg01 from "../../../../assets/img/bg/s_breadcrumb_bg01.jpg";
import { Link } from "react-router-dom";
import { useProduct } from "../../Context";
const BreadCrumb = () => {
  const { productName } = useProduct();
  return (
    <div>
      <div
        className="breadcrumb-area breadcrumb-style-two"
        style={{
          width: "100%",
          backgroundSize: "cover",
          backgroundImage: `url(${bg01})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="previous-product"></div>
            </div>
            <div className="col-lg-6">
              <div className="breadcrumb-content">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {productName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-3 d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
