import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../../Products/Context";

const Products = ({ products }) => {
  const { getProductById } = useProduct();
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
                    onClick={() => {
                      getProductById(product.id);
                    }}
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
                  <button title="Add To Cart" className="add-to-cart">
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
          )
        );
      })}
    </div>
  );
};

export default Products;
