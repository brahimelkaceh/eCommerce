import React from "react";
import { useSubCatData } from "../../../categories/Context";
import { useProduct } from "../../../Products/Context";
import { Link } from "react-router-dom";

const CatArea = () => {
  const { catData } = useSubCatData();

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
          {catData?.map((category) => {
            return (
              <div key={category.id} className="col">
                <div className="shop-cat-item">
                  <a href="shop-sidebar.html">
                    <div className="icon">
                      <img src="/src/assets/img/icon/music.png" alt />
                    </div>
                    <p>
                      <a href={`/shop?category=${category._id}`}>
                        {category.categoryName} <span>( 9 Items )</span>
                      </a>
                    </p>
                  </a>
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
