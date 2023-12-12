import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../../Products/Context";
import { CartStore } from "../../../cart/components/State/CartContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
const Products = ({ products }) => {
  const { discountPrice } = useProduct();
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

    // console.log("ShopOrders: ", JSON.parse(localStorage.getItem("ShopOrders")));
  }, [shoppingCart]);
  return (
    <>
      <div className="row">
        {products.map((product, i) => {
          console.log("activation",product.active)
          return (
            product?.active && (
              <div key={i} className="col-xl-4 col-sm-6">
                <div className="new-arrival-item text-center mb-50">
                  <div className="thumb mb-25">
                    <Link to={`/shop/${product.id}`}>
                      <img src={product.images[0]} alt={product.productName} />
                    </Link>
                    <div className="product-overlay-action">
                      <ul>
                        <li>
                          <a className="btn-icon" href="cart.html">
                            <i className="far fa-heart" />
                          </a>
                        </li>
                        <li>
                          <Link className="btn-icon" to={`/shop/${product.id}`}>
                            <i className="far fa-eye" />
                          </Link>
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
                      <Link to={`/shop/${product.id}`}>
                        {product.productName}
                      </Link>
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
            )
          );
        })}
      </div>

      {/* <Stack spacing={2}>
        {/* <Typography>Page: {page}</Typography> */}
      {/* <Pagination count={Math.ceil(products.length/3)} page={page} onChange={handleChange} /> */}
      {/* </Stack> */}
    </>
  );
};

export default Products;
