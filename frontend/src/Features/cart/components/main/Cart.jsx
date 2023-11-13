import React from "react";

const Cart = () => {
  return (
    <div className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cart-wrapper">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="product-thumbnail"></th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">QUANTITY</th>
                      <th className="product-subtotal">SUBTOTAL</th>
                      <th className="product-delete"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="shop-details.html">
                          <img src="img/product/cart_img01.jpg" alt="" />
                        </a>
                      </td>
                      <td className="product-name">
                        <h4>
                          <a href="shop-details.html">Travelling Bags</a>
                        </h4>
                      </td>
                      <td className="product-price">$ 37.00</td>
                      <td className="product-quantity">
                        <div className="cart-plus-minus">
                          <form action="#" className="num-block">
                            <input
                              type="text"
                              className="in-num"
                              value="1"
                              readonly=""
                            />
                            <div className="qtybutton-box">
                              <span className="plus">
                                <img src="img/icon/plus.png" alt="" />
                              </span>
                              <span className="minus dis">
                                <img src="img/icon/minus.png" alt="" />
                              </span>
                            </div>
                          </form>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span>$ 74.00</span>
                      </td>
                      <td className="product-delete">
                        <a href="#">
                          <i className="flaticon-trash"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="shop-details.html">
                          <img src="img/product/cart_img02.jpg" alt="" />
                        </a>
                      </td>
                      <td className="product-name">
                        <h4>
                          <a href="shop-details.html">Travelling Bags</a>
                        </h4>
                      </td>
                      <td className="product-price">$ 37.00</td>
                      <td className="product-quantity">
                        <div className="cart-plus-minus">
                          <form action="#" className="num-block">
                            <input
                              type="text"
                              className="in-num"
                              value="1"
                              readonly=""
                            />
                            <div className="qtybutton-box">
                              <span className="plus">
                                <img src="img/icon/plus.png" alt="" />
                              </span>
                              <span className="minus dis">
                                <img src="img/icon/minus.png" alt="" />
                              </span>
                            </div>
                          </form>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span>$ 74.00</span>
                      </td>
                      <td className="product-delete">
                        <a href="#">
                          <i className="flaticon-trash"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="shop-cart-bottom mt-20">
                <div className="cart-coupon">
                  <form action="#">
                    <input type="text" placeholder="Enter Coupon Code..." />
                    <button className="btn">Apply Coupon</button>
                  </form>
                </div>
                <div className="continue-shopping">
                  <a href="shop.html" className="btn">
                    update shopping
                  </a>
                </div>
              </div>
            </div>
            <div className="cart-total pt-95">
              <h3 className="title">CART TOTALS</h3>
              <div className="shop-cart-widget">
                <form action="#">
                  <ul>
                    <li className="sub-total">
                      <span>SUBTOTAL</span> $ 136.00
                    </li>
                    <li>
                      <span>SHIPPING</span>
                      <div className="shop-check-wrap">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            for="customCheck1"
                          >
                            FLAT RATE: $15
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck2"
                          />
                          <label
                            className="custom-control-label"
                            for="customCheck2"
                          >
                            FREE SHIPPING
                          </label>
                        </div>
                        <a href="#" className="calculate">
                          Calculate shipping
                        </a>
                      </div>
                    </li>
                    <li className="cart-total-amount">
                      <span>TOTAL</span>{" "}
                      <span className="amount">$ 151.00</span>
                    </li>
                  </ul>
                  <a href="checkout.html" className="btn">
                    PROCEED TO CHECKOUT
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
