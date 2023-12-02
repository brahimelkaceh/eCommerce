import React from "react";
import banner from "../../../../assets/img/banner.webp";
import { useProduct } from "../../../Products/Context";
const NewArrival = () => {
  const { products } = useProduct();

  return (
    <main>
      <section className="new-arrival-area home7-new-arrival pt-95 pb-50">
        <div className="container custom-container-two">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="section-title text-center text-lg-left mb-45">
                <h3 className="title">New Arrival Collection</h3>
              </div>
              <div className="discount-end-time-wrap mb-50">
                <img src="" alt />
                <div className="content">
                  <div className="icon">
                    <img src="" alt />
                  </div>
                  <h2>Cyber Monday</h2>
                  <span>Super Offer TO 50% OFF</span>
                  <div className="coming-time" data-countdown="2021/9/21" />
                  <a href="#" className="btn">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="row new-arrival-active">
                {products?.map((product) => {
                  return (
                    <div
                      className="col-xl-4 col-sm-6 grid-item grid-sizer cat-two"
                      key={product?._id}
                    >
                      <div className="new-arrival-item text-center mb-50">
                        <div className="thumb mb-25">
                          <div className="discount-tag new">New</div>

                          <a href="shop-details.html">
                            <img src={product?.images[0]} alt />
                          </a>
                          <div className="product-overlay-action">
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="far fa-heart" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="far fa-eye" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h5>
                            <a href="#">{product?.productName}</a>
                          </h5>
                          <span className="price">
                            ${product?.options[0]?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewArrival;
