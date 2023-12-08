import React, { useEffect } from "react";
import { useProduct } from "../../../Products/Context";
import banner from "../../../../assets/img/banner.webp";
import { CartStore } from "../../../cart/components/State/CartContext";
import { Link } from "react-router-dom";
const Trending = () => {
  const { products, discountPrice } = useProduct();
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CartOrders"));
    // console.log("storedCart:1", storedCart);
    dispatch({ type: "SET_TO_CART", payload: storedCart });
  }, []);
  useEffect(() => {
    // console.log("shopingCart: ", shoppingCart);
    localStorage.setItem("ShopOrders", JSON.stringify(shoppingCart));
    localStorage.setItem("CartOrders", JSON.stringify(shoppingCart));

    console.log("ShopOrders: ", JSON.parse(localStorage.getItem("ShopOrders")));
  }, [shoppingCart]);
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
            <div className="col-12">
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
                    {products?.slice(0, 4).map((product) => {
                      return (
                        <div className="col" key={product?._id}>
                          <div className="features-product-item">
                            <div className="features-product-thumb">
                              {product?.discountPrice > 0 && (
                                <div className="discount-tag">
                                  -{product?.discountPrice}%
                                </div>
                              )}
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
                                    <button className="btn-icon">
                                      <i className="far fa-eye" />
                                    </button>
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
                                <Link to={`/shop/${product.id}`}>
                                  {product?.productName}
                                </Link>
                              </h5>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "end",
                                  gap: "10px",
                                }}
                              >
                                {product?.discountPrice > 0 && (
                                  <p
                                    className="price"
                                    style={{
                                      textDecorationLine: "line-through",
                                      fontSize: "14px",
                                      color: "#777",
                                    }}
                                  >
                                    ${product?.options[0]?.price}
                                  </p>
                                )}

                                <p className="price">
                                  $
                                  {discountPrice(
                                    product?.options[0]?.price,
                                    product?.discountPrice
                                  )}
                                </p>
                              </div>

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
                            {/* <div className="features-product-cart">
                              <a href="cart.html">add to cart</a>
                            </div> */}
                            <div className="features-product-cart ">
                              <button
                                title="Add To Cart"
                                className="add-to-cart"
                                onClick={() =>
                                  dispatch({
                                    type: "ADD_TO_CART",
                                    product: product,
                                    id: product._id,
                                  })
                                }
                              >
                                ADD TO CART
                              </button>
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
