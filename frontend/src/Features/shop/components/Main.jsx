import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSubCatData } from "../../categories/Context";
import Categories from "./widgets/Categories";
import Products from "./widgets/Products";
import { useProduct } from "../../Products/Context";

const Main = () => {
  const { products: allProducts } = useProduct();
  const { SubcatData, catData } = useSubCatData();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedSubcategory) {
      const subcategoryId = selectedSubcategory;
      const filtered = allProducts.filter((product) => {
        console.log("product", product.subCategoryId);
        // console.log('selected sub', subcategoryId);
        return product.subCategoryId._id === subcategoryId;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [selectedSubcategory, allProducts]);

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleResetSubcategory = () => {
    setSelectedSubcategory(null);
  };

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
                <Categories
                  catData={catData}
                  SubcatData={SubcatData}
                  onSubcategoryClick={handleSubcategoryClick}
                />
                <div onClick={handleResetSubcategory}>View All Products</div>
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
                        <li>Showing 1–{allProducts.length} of 80 results</li>
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
              <Products products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
