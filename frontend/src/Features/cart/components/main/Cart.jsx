import React from "react";
import { CartStore } from "../State/CartContext";
import { useEffect, useState } from "react";
const Cart = () => {
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  console.log("total options.price", totalPrice);
  console.log("shoppingCart" , shoppingCart)
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
  const handleClick = () => {
    const orderItems = shoppingCart.map((product) =>(
    {
      product: product._id,
      quantity: product.orderQty
      })
      
    );
    const order = {
      CustomerID: "CustomerID",
      orderItems: orderItems,
      cartTotalPrice: totalPrice,
      Status:"Open"
    }
  console.log(order)
  }

  return (
    <div className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cart-wrapper">
              <div className="table-responsive">
                {/* <p>here the added products should added </p>
                <p>here you can add subtract and empty the product</p> */}
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
                    {shoppingCart.length > 0 &&
                      shoppingCart.map((product) => (
                     
                        <tr key={product._id}>
                          <td className="product-thumbnail">
                            <a href="shop-details.html">
                              <img src={product.images[0]} alt="" />
                            </a>
                          </td>
                          <td className="product-name">
                            <h4>
                              <a href="shop-details.html">
                                {product.productName}
                              </a>
                            </h4>
                          </td>
                          <td className="product-price">
                            {product.RealPrice}
                          </td>
                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <form className="num-block">
                                <input
                                  type="text"
                                  className="in-num"
                                  value={product.orderQty}
                                  readonly=""
                                  max={product.quantity + 1}
                                />
                                <div className="qtybutton-box">
                                  {/* <span className="plus">
                                  {/* <img src="img/icon/plus.png" alt="" /> */}

                                  {/* </span> */}

                                  <button
                                    style={{ width: "100%" }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      dispatch({
                                        type: "INCREMENT",
                                        id: product._id,
                                      });
                                    }}
                                  >
                                    +
                                  </button>

                                  {/* <span className="minus dis">
                                  {/* <img src="img/icon/minus.png" alt="" /> */}
                                  {/* - */}
                                  {/* </span> */}
                                  <button
                                    style={{ width: "100%" }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      dispatch({
                                        type: "DECREMENT",
                                        id: product._id,
                                      });
                                    }}
                                  >
                                    -
                                  </button>
                                </div>
                              </form>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span>{product.subTotal}</span>
                          </td>
                          <td className="product-delete">
                            {/* <a href="#">
                            <i className="flaticon-trash"></i>
                          </a> */}
                            <button
                              style={{ width: "100%" }}
                              onClick={() =>
                                dispatch({
                                  type: "DELETE_PRODUCT",
                                  id: product._id,
                                })
                              }
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="shop-cart-bottom mt-20">
                <div className="cart-coupon">
                  {/* <form action="#">
                    <input type="text" placeholder="Enter Coupon Code..." />
                    <button className="btn" onClick={handleClick}>
                      Apply Coupon
                    </button>
                  </form> */}
                </div>
                {/* <div className="continue-shopping">
                  <a href="shop.html" className="btn">
                    update shopping
                  </a>
                </div> */}
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
                      <span className="amount">${totalPrice}</span>
                    </li>
                  </ul>
                  {/* <a href="checkout.html" className="btn">
                    PROCEED TO CHECKOUT
                  </a> */}
                  <button className="btn" onClick={handleClick}>
                    Apply Coupon
                  </button>
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
