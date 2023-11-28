import React from "react";

const Main = () => {
  return (
    <div>
      <section className="shop-details-area pt-100 pb-95">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="shop-details-flex-wrap">
                <div className="shop-details-nav-wrap">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="item-one-tab"
                        data-toggle="tab"
                        href="#item-one"
                        role="tab"
                        aria-controls="item-one"
                        aria-selected="true"
                      >
                        <img src="img/product/sd_nav_img01.jpg" width="99" height="117" alt />
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="item-two-tab"
                        data-toggle="tab"
                        href="#item-two"
                        role="tab"
                        aria-controls="item-two"
                        aria-selected="false"
                      >
                        <img src="img/product/sd_nav_img02.jpg" width="99" height="117" alt />
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="item-three-tab"
                        data-toggle="tab"
                        href="#item-three"
                        role="tab"
                        aria-controls="item-three"
                        aria-selected="false"
                      >
                        <img src="img/product/sd_nav_img03.jpg" width="99" height="117" alt />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="shop-details-img-wrap">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="item-one"
                      role="tabpanel"
                      aria-labelledby="item-one-tab"
                    >
                      <div className="shop-details-img">
                        <img src="img/product/shop_details_img01.jpg" width="621" height="689" alt />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="item-two"
                      role="tabpanel"
                      aria-labelledby="item-two-tab"
                    >
                      <div className="shop-details-img">
                        <img src="img/product/shop_details_img02.jpg" width="99" height="117" alt />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="item-three"
                      role="tabpanel"
                      aria-labelledby="item-three-tab"
                    >
                      <div className="shop-details-img">
                        <img src="img/product/shop_details_img03.jpg" width="99" height="117" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="shop-details-content">

                <h3 className="title">Mini Aquarium Humidifier</h3>

                
                <div className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <p className="style-name">
                   Product Sku: 82600800
                </p>
                <div className="price">Price : $ 29.00</div>
                <div className="product-details-info">
                  <div className="sidebar-product-size mb-30">
                    <h4 className="widget-title">Product Size</h4>
                    <div className="shop-size-list">
                      <ul>
                        <li>
                          <a href="#">S</a>
                        </li>
                        <li>
                          <a href="#">M</a>
                        </li>
                        <li>
                          <a href="#">L</a>
                        </li>
                        <li>
                          <a href="#">XL</a>
                        </li>
                        <li>
                          <a href="#">XXL</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-product-color">
                    <h4 className="widget-title">Color</h4>
                    <div className="shop-color-list">
                      <ul>
                        <li />
                        <li />
                        <li />
                        <li />
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="perched-info">
                  <div className="cart-plus-minus">
                    <form action="#" className="num-block">
                      <input
                        type="text"
                        className="in-num"
                        defaultValue={1}
                        readOnly
                      />
                      <div className="qtybutton-box">
                        <span className="plus">
                          <img src="img/icon/plus.png" alt />
                        </span>
                        <span className="minus dis">
                          <img src="img/icon/minus.png" alt />
                        </span>
                      </div>
                    </form>
                  </div>
                  <a href="#" className="btn">
                    add to cart
                  </a>
                  <div className="wishlist-compare">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="far fa-heart" /> Add to Wishlist
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-details-share">
                  <ul>
                    <li>Share :</li>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-desc-wrap">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="description-tab"
                      data-toggle="tab"
                      href="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      Description Guide
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <div className="product-desc-title mb-30">
                      <h4 className="title">Additional information :</h4>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      The purpose of lorem ipsum is to create a natural looking
                      block of text (sentence, paragraph, page, etc.) that
                      doesn't distract from the layout. A practice not without
                      controversy, laying out pages with meaningless filler text
                      can be very useful when the focus is meant to be on
                      design, not content.
                    </p>

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
