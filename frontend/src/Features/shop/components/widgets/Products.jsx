import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../../Products/Context";
import { CartStore } from "../../../cart/components/State/CartContext";

const Products = ({ products }) => {
  // const { getProductById } = useProduct();
  const {  discountPrice } = useProduct();
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

    console.log("ShopOrders: ", JSON.parse(localStorage.getItem("ShopOrders")));
  }, [shoppingCart]);
  return (
    <div className="row">
      {products.map((product) => {
        return (
          product?.active && (
            <div key={product.id} className="col-xl-4 col-sm-6">
              <div className="new-arrival-item text-center mb-50">
                <div className="thumb mb-25">
                  <Link
                    to={`/shop/${product.id}`}
                    // onClick={() => {
                    //   getProductById(product.id);
                    // }}
                  >
                    <img src={product.images[0]} alt={product.productName} />
                  </Link>
                  <div className="product-overlay-action">
                    <ul>
                      <li>
                        <a href="cart.html">
                          <i className="far fa-heart" />
                        </a>
                      </li>
                      <li>
                        <Link to={`/shop/${product.id}`}>
                          <i className="far fa-eye" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <button title="Add To Cart" className="add-to-cart">
                    Add To Cart
                  </button> */}
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
                    <Link to={`/shop/${product.id}`}>
                      {product.productName}
                    </Link>
                  </h5>
                  <span className="price">${product.options[0].price}</span>
                  <span className="price">
                    Discount price $ 
                    {discountPrice(
                      product.options[0].price,
                      product.discountPrice
                    )}
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Products;
