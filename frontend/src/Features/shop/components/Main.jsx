import React from "react";
import { useProduct } from "../../Products/Context";
import { Link } from "react-router-dom";
import { useSubCatData } from "../../categories/Context";
import Categories from "./widgets/Categories";
import Products from "./widgets/Products";

const Main = () => {
  const { products } = useProduct();
  const { SubcatData, catData } = useSubCatData();

  console.log("catData:", catData);
  console.log("SubcatData:", SubcatData);
  console.log("products:", products);

  return (
    <div>
      <section className="shop-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <aside className="shop-sidebar">
                <div className="widget side-search-bar">
                  <form action="#">
                    <input type="text" />
                    <button>
                      <i className="flaticon-search" />
                    </button>
                  </form>
                </div>
                <Categories catData={catData} SubcatData={SubcatData} />
              </aside>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="shop-top-meta mb-35">
                <div className="row">
                  <div className="col-md-6">
                    <div className="shop-top-left">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="flaticon-menu" /> FILTER
                          </a>
                        </li>
                        <li>Showing 1–{products.length} of 80 results</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="shop-top-right">
                      <form action="#">
                        <select name="select">
                          <option value>Sort by newness</option>
                          <option>Free Shipping</option>
                          <option>Best Match</option>
                          <option>Newest Item</option>
                          <option>Size A - Z</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <Products products={products} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
