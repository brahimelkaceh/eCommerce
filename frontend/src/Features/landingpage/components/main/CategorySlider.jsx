import React from "react";
import { useSubCatData } from "../../../categories/Context";
import { Link } from "react-router-dom";
const CategorySlider = () => {
  const { catData } = useSubCatData();
  console.log("catData: ", catData);
  return (
    <main>
      {/* <section className="h7-slider-bottom-product pt-20">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-md-6">
              <div className="h7s-bottom-item mb-20">
                <img src="" alt="" />
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
                <img src="" alt="" />
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
                <img src="" alt="" />
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
                <img src="" alt="" />
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
      </section> */}
      <section className="h7-slider-bottom-product pt-20">
        <div className="container-fluid">
          <div className="row justify-content-center">
            {catData.map((category) => (
              <div key={category._id} className="col-xl-3 col-md-6">
                <div className="h7s-bottom-item mb-20">
                  {/* <img src={category.imageSrc} alt={category.categoryName} /> */}
                  <div className="content">
                    <h5>
                      <Link
                        to={`/shop?category=${category._id}`}
                      >
                        {category.categoryName}
                      </Link>
                    </h5>
                    <Link
                      to={`/shop?category=${category._id}`}
                      className="btn"
                    >
                      shop now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategorySlider;
