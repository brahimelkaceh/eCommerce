import React from "react";

import { Link } from "react-router-dom";

const CatArea = () => {
  const subcategory = ["Furniture", "Wall Art", "Music", "Electronics", "Bags"];

  return (
    <section className="category-area pt-80 pb-45">
      <div className="container">
        <div className="cat-title-line">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              <div className="cat-section-title text-center">
                <span className="sub-title">PREMIUM QUALITY</span>
                <h2 className="title">
                  Unlocking inspiration through a one-of-a-kind blend <br /> of
                  products, creativity, and cultural insight
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {subcategory?.map((category, i) => {
            return (
              <div key={i} className="col">
                <div className="shop-cat-item">
                  <Link to={`/shop`}>
                    <div className="icon">
                      <img src={`/src/assets/img/icon/icon${i + 1}.png`} alt />
                    </div>
                    <p>
                      <Link to={`/shop`}>{category}</Link>
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatArea;
