import React, { useState, useEffect } from "react";
import { useProduct } from "../../Products/Context";
import { Link, useLocation } from "react-router-dom";
import { useSubCatData } from "../../categories/Context";
import Categories from "./widgets/Categories";
import Products from "./widgets/Products";
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { products: allProducts } = useProduct();
  const { SubcatData, catData } = useSubCatData();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const categoryId = new URLSearchParams(location.search).get("category");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shop?category=${categoryId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format");
        }

        const data = await response.json();
        console.log(data)
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  useEffect(() => {
    if (selectedSubcategory) {
      const filtered = allProducts.filter(
        (product) => product.subCategoryId._id === selectedSubcategory
      );
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
    navigate("/shop")
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
              <Products products={categoryId ? products : filteredProducts} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
