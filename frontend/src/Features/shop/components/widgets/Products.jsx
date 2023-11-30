import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CartStore } from "../../../cart/components/State/CartContext";
const Products = ({ products }) => {
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
    useEffect(() => {
      console.log("ShoppingCart: ", shoppingCart);

      const storedCart = JSON.parse(localStorage.getItem("CartOrders"));
      // console.log("storedCart:1", storedCart);
      dispatch({ type: "SET_TO_CART", payload: storedCart });
    }, []);
    useEffect(() => {
      // console.log("shopingCart: ", shoppingCart);
      localStorage.setItem("ShopOrders", JSON.stringify(shoppingCart));
      localStorage.setItem("CartOrders", JSON.stringify(shoppingCart));

      console.log(
        "ShopOrders: ",
        JSON.parse(localStorage.getItem("ShopOrders"))
      );
    }, [shoppingCart]);
  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-xl-4 col-sm-6">
          <div className="new-arrival-item text-center mb-50">
            <div className="thumb mb-25">
              <Link to={`/shop-details/${product.id}`}>
                <img
                  src={product.images[0]}
                  width="296px"
                  height="344px"
                  alt={product.productName}
                />
              </Link>
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
            </div>
            <div className="content">
              <h5>
                <a href="shop-details.html">{product.productName}</a>
              </h5>
              <span className="price">${product.options[0].price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
