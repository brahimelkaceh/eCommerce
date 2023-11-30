import React from "react";
import { useProduct } from "../../../Products/Context";
import banner from "../../../../assets/img/banner.webp";

const Trending = () => {
  const { products } = useProduct();
  return (
    <main>
      <section className="trending-product-area trending-product-two gray-bg pt-95 pb-100">
        <div className="container custom-container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6">
              <div className="section-title title-style-two text-center mb-50">
                <h3 className="title">Trending Products</h3>
              </div>
            </div>
          </div>
          <div className="row no-gutters trending-product-grid">
            <div className="col-2">
              {/* Trending Products */}
              <div className="trending-products-list">
                <h5>Clothing</h5>
                <ul className="nav nav-tabs" id="trendingTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="accessories-tab"
                      data-toggle="tab"
                      href="#accessories"
                      role="tab"
                      aria-controls="accessories"
                      aria-selected="true"
                    >
                      Accessories
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="bags-tab"
                      data-toggle="tab"
                      href="#bags"
                      role="tab"
                      aria-controls="bags"
                      aria-selected="false"
                    >
                      Beds
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="bSellers-tab"
                      data-toggle="tab"
                      href="#bSellers"
                      role="tab"
                      aria-controls="bSellers"
                      aria-selected="false"
                    >
                      Best Sellers
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="shirts-tab"
                      data-toggle="tab"
                      href="#shirts"
                      role="tab"
                      aria-controls="shirts"
                      aria-selected="false"
                    >
                      Bed Room
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="shoesTwo-tab"
                      data-toggle="tab"
                      href="#shoesTwo"
                      role="tab"
                      aria-controls="shoesTwo"
                      aria-selected="false"
                    >
                      Sofa Set
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="travelOut-tab"
                      data-toggle="tab"
                      href="#travelOut"
                      role="tab"
                      aria-controls="travelOut"
                      aria-selected="false"
                    >
                      Rocking Chair
                    </a>
                  </li>
                </ul>
                <p className="offer">
                  <a href="#">Limited-Time Offer!</a>
                </p>
              </div>
            </div>
            <div className="col-10">
              <div
                className="tab-content tp-tab-content"
                id="trendingTabContent"
              >
                <div
                  className="tab-pane show active"
                  id="accessories"
                  role="tabpanel"
                  aria-labelledby="accessories-tab"
                >
                  <div className="trending-products-banner banner-animation">
                    <a href="shop-sidebar.html">
                      <img src={banner} alt />
                    </a>
                  </div>
                  <div className="row trending-product-active">
                    {products?.slice(0, 3).map((product) => {
                      console.log(product);
                      return (
                        <div className="col" key={product?._id}>
                          <div className="features-product-item">
                            <div className="features-product-thumb">
                              <div className="discount-tag">
                                -{product?.discountPrice}%
                              </div>
                              <a href="shop-details.html">
                                <img src={product?.images[0]} alt />
                              </a>
                              <div className="product-overlay-action">
                                <ul>
                                  <li>
                                    <a href="cart.html">
                                      <i className="far fa-heart" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-sidebar.html">
                                      <i className="far fa-eye" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="features-product-content">
                              {/* <div className="rating">
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                              </div> */}
                              <h5>
                                <a href="shop-details.html">
                                  {product?.productName}
                                </a>
                              </h5>
                              <p className="price">
                                ${product?.options[0]?.price}
                              </p>
                              <div className="features-product-bottom">
                                <ul>
                                  {product?.options[0]?.color?.map(
                                    (color, i) => {
                                      const colors_array = color.split(",");
                                      return (
                                        <li className="color-option" key={i}>
                                          {colors_array?.map((clr, i) => {
                                            return (
                                              <React.Fragment key={i}>
                                                <span
                                                  className="gray"
                                                  style={{
                                                    backgroundColor:
                                                      clr === "GREEN"
                                                        ? "#A7D397"
                                                        : clr === "PINK"
                                                        ? "#F8BDEB"
                                                        : clr === "PURPLE"
                                                        ? "#B15EFF"
                                                        : "gray",
                                                  }}
                                                />
                                              </React.Fragment>
                                            );
                                          })}
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="features-product-cart">
                              <a href="cart.html">add to cart</a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Trending;
