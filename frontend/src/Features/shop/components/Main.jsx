import React from "react";

const Main = () => {
  return (
    <div>
      {/* <!-- shop-area --> */}
      <section className="shop-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            {/* <!-- filter-sidebar --> */}

            <div className="col-xl-3 col-lg-4">
              <aside className="shop-sidebar">
                <div className="widget side-search-bar">
                  <form action="#">
                    <input type="text" />
                    <button>
                      <i className="flaticon-search" />
                    </button>
                  </form>
                </div>

                {/* map of categories */}

                <div className="widget">
                  <h4 className="widget-title">Homeware</h4>
                  <div className="sidebar-brand-list">
                    <ul>
                      <li>
                        <a href="#">
                          Furniture{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Artifact{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Wall Art{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <h4 className="widget-title">Lifestyle</h4>
                  <div className="sidebar-brand-list">
                    <ul>
                      <li>
                        <a href="#">
                          Electronics{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Desk Supplies{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Music{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <h4 className="widget-title">Accessories</h4>
                  <div className="sidebar-brand-list">
                    <ul>
                      <li>
                        <a href="#">
                          Bags{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Caps &amp; Scarves{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Sunglasses{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <h4 className="widget-title">Gifts</h4>
                  <div className="sidebar-brand-list">
                    <ul>
                      <li>
                        <a href="#">
                          Gift Set{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Luxe Gifts{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Responsible Gifts{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </li>

                    </ul>
                  </div>



                </div>



              </aside>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="shop-top-meta mb-35">
                <div className="row">
                  <div className="col-md-6">
                    <div className="shop-top-left">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="flaticon-menu" /> FILTER
                          </a>
                        </li>
                        <li>Showing 1–9 of 80 results</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="shop-top-right">
                      <form action="#">
                        <select name="select">
                          <option value>Sort by newness</option>
                          <option>Free Shipping</option>
                          <option>Best Match</option>
                          <option>Newest Item</option>
                          <option>Size A - Z</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* products map   */}
                <div className="col-xl-4 col-sm-6">
                  <div className="new-arrival-item text-center mb-50">
                    <div className="thumb mb-25">
                      <a href="shop-details.html">
                        <img
                          src="img/product/n_arrival_product01.jpg"
                          width="296px"
                          height="344px"
                          alt
                        />
                      </a>
                      <div className="product-overlay-action">
                        <ul>
                          <li>
                            <a href="cart.html">
                              <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="shop-details.html">
                              <i className="far fa-eye" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <button title="Add To Cart" className=" add-to-cart">
                        Add To Cart
                      </button>
                    </div>
                    <div className="content">
                      <h5>
                        <a href="shop-details.html">Bomber in Cotton</a>
                      </h5>
                      <span className="price">$37.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="new-arrival-item text-center mb-50">
                    <div className="thumb mb-25">
                      <div className="discount-tag">- 20%</div>
                      <a href="shop-details.html">
                        <img
                          src="img/product/n_arrival_product02.jpg"
                          width="296px"
                          height="344px"
                          alt
                        />
                      </a>
                      <div className="product-overlay-action">
                        <ul>
                          <li>
                            <a href="cart.html">
                              <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="shop-details.html">
                              <i className="far fa-eye" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <button title="Add To Cart" className=" add-to-cart">
                        Add To Cart
                      </button>
                    </div>
                    <div className="content">
                      <h5>
                        <a href="shop-details.html">Travelling Bags</a>
                      </h5>
                      <span className="price">$25.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
