import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
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
      ))}
    </div>
  );
};

export default Products;
