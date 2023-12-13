import React, { useEffect } from "react";
import banner from "../../../../assets/img/banner.webp";
import { useProduct } from "../../../Products/Context";
import { CartStore } from "../../../cart/components/State/CartContext";
import { Link } from "react-router-dom";
import Preloader from "../Preloader";
const NewArrival = () => {
  const { products, discountPrice, loading } = useProduct();
  const { dispatch } = CartStore();
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
                <img src="/src/assets/img/bg/monday.jpg" alt />
                <div className="content">
                  <div className="icon">
                    <img src="" alt />
                  </div>
                  <h2>Cyber Monday</h2>
                  <span>UP TO 50% OFF</span>
                  <div className="coming-time" data-countdown="2021/9/21" />
                  <Link to="/shop" className="btn">
                    shop now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="row new-arrival-active">
                {loading && <Preloader />}
                {products?.slice(6, 12).map((product) => {
                  return (
                    <div
                      className="col-xl-4 col-sm-6 grid-item grid-sizer cat-two"
                      key={product?._id}
                    >
                      <div className="new-arrival-item text-center mb-50">
                        <div className="thumb mb-25">
                          <div className="discount-tag new">New</div>

                          <Link to={`/shop/${product.id}`}>
                            <img src={product?.images[0]} alt />
                          </Link>
                          <div className="product-overlay-action">
                            <ul>
                              <li>
                                <button className="btn-icon">
                                  <i className="far fa-heart" />
                                </button>
                              </li>
                              <li>
                                <a
                                  href={`/shop/${product.id}`}
                                  className="btn-icon"
                                >
                                  <i className="far fa-eye" />
                                </a>
                              </li>
                              <li>
                                <button
                                  className="btn-icon"
                                  onClick={() =>
                                    dispatch({
                                      type: "ADD_TO_CART",
                                      product: product,
                                      id: product._id,
                                    })
                                  }
                                >
                                  <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                  />
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h5>
                            <a href="#">{product?.productName}</a>
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            {product?.discountPrice > 0 && (
                              <span
                                className="price"
                                style={{
                                  textDecorationLine: "line-through",
                                  fontSize: "14px",
                                  color: "#777",
                                }}
                              >
                                ${product?.options[0]?.price}
                              </span>
                            )}

                            <span
                              className="price"
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              $
                              {discountPrice(
                                product?.options[0]?.price,
                                product?.discountPrice
                              ).toFixed(2)}
                            </span>
                          </div>
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
