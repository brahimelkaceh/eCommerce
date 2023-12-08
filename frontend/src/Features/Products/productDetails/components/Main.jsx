import React, { useEffect, useState } from "react";
import { useProduct } from "../../Context";
import { getP } from "../../Services";
import { useParams } from "react-router-dom";
import { CartStore } from "../../../cart/components/State/CartContext";
const Main = () => {
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  const { fetchProductById } = useProduct();
  const [product, setproduct] = useState(null);
  const [bigimage, setbigimage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProuctData = async () => {
      const response = await fetchProductById(id);
      setproduct(response.data.data);
    };
    getProuctData();
  }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("ShopOrders"));
    dispatch({ type: "SET_TO_CART", payload: storedCart });
  }, []);

  useEffect(() => {
    // console.log("shopingCart: ", shoppingCart);
    localStorage.setItem("CartOrders", JSON.stringify(shoppingCart));
    localStorage.setItem("ShopOrders", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  return (
    <div>
      {product && (
        <section className="shop-details-area pt-100 pb-95">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="shop-details-flex-wrap">
                  <div className="shop-details-nav-wrap">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        {product.images.map((img, i) => (
                          <a
                            key={i}
                            className="nav-link active"
                            id="item-one-tab"
                            data-toggle="tab"
                            href="#item-one"
                            role="tab"
                            aria-controls="item-one"
                            aria-selected="true"
                            onMouseEnter={(e) => setbigimage(e.target.src)}
                          >
                            <img
                              style={{
                                objectFit: "cover",
                              }}
                              src={img}
                              width="99"
                              height="117"
                              alt
                            />
                          </a>
                        ))}
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
                          <img
                            src={bigimage || product.images[0]}
                            width="621"
                            height="689"
                            alt
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="item-two"
                        role="tabpanel"
                        aria-labelledby="item-two-tab"
                      >
                        <div className="shop-details-img">
                          <img
                            src="img/product/shop_details_img02.jpg"
                            width="99"
                            height="117"
                            alt
                          />
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="item-three"
                        role="tabpanel"
                        aria-labelledby="item-three-tab"
                      >
                        <div className="shop-details-img">
                          <img
                            src="img/product/shop_details_img03.jpg"
                            width="99"
                            height="117"
                            alt
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="shop-details-content">
                  <h3 className="title">{product.productName}</h3>

                  <p className="style-name">Product Sku:{product.sku}</p>
                  <p className="style-name">
                    Short Description :{product.shortDescription}
                  </p>
                  <div className="price">
                    Price : {product.options[0].price}
                  </div>

                  {/* <div className="product-details-info">
                    {product.options[0].size[0] && (
                      <div className="sidebar-product-size mb-30">
                        <h4 className="widget-title">Product Size</h4>
                        <div className="shop-size-list">
                          <ul>
                            {product.options[0].size.map((s) => {
                              return s.split(",").map((size) => (
                                <li>
                                  <a>{size}</a>
                                </li>
                              ));
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                    {product?.options[0].color[0] && (
                      <div className="sidebar-product-color">
                        <h4 className="widget-title">Color</h4>
                        <div className="shop-color-list">
                          <ul>
                            {product?.options[0].color?.map((clr, i) => {
                              return clr.split(",").map((c, i) => {
                                console.log(c);
                                return (
                                  <li
                                    className="gray"
                                    style={{
                                      backgroundColor: c,
                                    }}
                                  ></li>
                                );
                              });
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div> */}

                  <div className="perched-info">
                    <button
                      title="Add To Cart"
                      className="btn"
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          product: product,
                          id: product._id,
                        })
                      }
                    >
                      Add To Cart
                    </button>
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
                      <p>{product.shortDescription}</p>
                      <p>{product.longDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Main;
