import React, { useEffect, useState } from "react";
import { useProduct } from "../../Context";
import { getP } from "../../Services";
import { useParams } from "react-router-dom";
import { CartStore } from "../../../cart/components/State/CartContext";
const Main = () => {
    const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  const { fetchProductById } = useProduct();
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  console.log("id", id);
  // fetchProductById("65685bf55892aaf477a47ac5");
  // getP("65685bf55892aaf477a47ac5");
  useEffect(() => {
    const getProuctData = async () => {
      const response = await fetchProductById(id);
      console.log("respoise", response.data.data);
      setproduct(response.data.data);
      console.log(response.data);
    };
    getProuctData();
  }, []);
  useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("ShopOrders"));
  // console.log("storedCart:1", storedCart);
  dispatch({ type: "SET_TO_CART", payload: storedCart });
}, []);

  useEffect(() => {
  // console.log("shopingCart: ", shoppingCart);
  localStorage.setItem("CartOrders", JSON.stringify(shoppingCart));
  localStorage.setItem("ShopOrders", JSON.stringify(shoppingCart));

  console.log("CartOrders: ", JSON.parse(localStorage.getItem("CartOrders")));
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
                        {product.images.map((im) => (
                          <a
                            className="nav-link active"
                            id="item-one-tab"
                            data-toggle="tab"
                            href="#item-one"
                            role="tab"
                            aria-controls="item-one"
                            aria-selected="true"
                          >
                            <img src={im} width="99" height="117" alt />
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
                            src={product.images[0]}
                            width="621"
                            height="689"
                            alt
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
                  <div className="price">
                    Price : {product.options[0].price}
                  </div>
                  <div className="product-details-info">
                    <div className="sidebar-product-size mb-30">
                      <h4 className="widget-title">Product Size</h4>
                      <div className="shop-size-list">
                        <ul>
                          <li>
                            {product.options[0].size.map((s) => (
                              <a href="#">{s}</a>
                            ))}
                          </li>
                          <li></li>
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
                      {/* <form action="#" className="num-block">
                        {console.log(product)}
                        <input
                          type="text"
                          className="in-num"
                          value={product.orderQty}
                          readonly=""
                          max={product.quantity + 1}
                        />
                        {/* <div className="qtybutton-box">
                          {/* <span className="plus">
                            <img src="img/icon/plus.png" alt />
                          </span> *}
                          {/* <span className="minus dis">
                            <img src="img/icon/minus.png" alt />
                          </span> */}
                        {/* </div> */} 
                      {/* </form> */}
                    </div>
                    {/* <a href="#" className="btn">
                      add to cart
                    </a> */}
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
                      Add To Cart
                    </button>
                    <div className="wishlist-compare">
                      <ul>
                        <li>
                          <a  href="#">
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
