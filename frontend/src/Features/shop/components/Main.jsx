import React, { useState, useEffect } from "react";
import { useProduct } from "../../Products/Context";
import { Link } from "react-router-dom";
import { useSubCatData } from "../../categories/Context";
import Categories from "./widgets/Categories";
import Products from "./widgets/Products";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const Main = () => {
  const { products: allProducts } = useProduct();
  const {
    SubcatData,
    catData,
    subCategoryID,
    selectedSubcategory,
    setSelectedSubcategory,
  } = useSubCatData();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [RealProducts, setRealProducts] = useState([]);

  // it should be constant with no change
  useEffect(() => {
    if (selectedSubcategory) {
      const subcategoryId = selectedSubcategory;
      const filtered = allProducts.filter((product) => {
        return product.subCategoryId._id === subcategoryId;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
      setRealProducts(allProducts);
    }
  }, [selectedSubcategory, allProducts]);

  const handleSubcategoryClick = (subcategoryId) => {
    console.log(subcategoryId);
    setSelectedSubcategory(subcategoryId);
    console.log(selectedSubcategory, "In main");
  };

  const handleResetSubcategory = () => {
    setSelectedSubcategory(null);
  };
  // console.log(filteredProducts);

  return (
    <div>
      <section className="shop-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <aside className="shop-sidebar">
                <div className="widget side-search-bar">
                  <form action="#">
                    <input
                      className="input"
                      type="text"
                      onChange={(e) => {
                        // setText(e.target.value);
                        const regex = new RegExp(e.target.value, "i");
                        let newProducts = [];
                        RealProducts.forEach((product) => {
                          if (regex.test(product.productName)) {
                            newProducts.push(product);
                          }
                        });
                        setFilteredProducts(newProducts);
                        setPage(1);
                      }}
                    />

                    <button onClick={(e) => e.preventDefault()}>
                      <i className="flaticon-search" />
                    </button>
                  </form>
                </div>
                <Categories
                  catData={catData}
                  SubcatData={SubcatData}
                  onSubcategoryClick={handleSubcategoryClick}
                />
                <div
                  onClick={handleResetSubcategory}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  View All Products
                </div>
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
                        <li>Showing 6 of {allProducts.length} results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Products
                products={filteredProducts.slice((page - 1) * 6, page * 6)}
              />
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredProducts.length / 6)}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
