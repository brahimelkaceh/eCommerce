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
  const { SubcatData, catData } = useSubCatData();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [text, setText] = useState('');
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
        console.log("product", product.subCategoryId);
        // console.log('selected sub', subcategoryId);
        return product.subCategoryId._id === subcategoryId;
      });
      setFilteredProducts(filtered);
  
    } else {
      setFilteredProducts(allProducts);
          setRealProducts(allProducts);
    }
  }, [selectedSubcategory, allProducts]);

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
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
                        // console.log("showed Products",newProducts);
                        // console.log("real Products", RealProducts);
                        // console.log("filtered Products", filteredProducts);
                        setFilteredProducts(newProducts);
                        setPage(1);
                      }}
                    />

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
                        <li>Showing 3 of {allProducts.length} results</li>
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
              <Products
                products={filteredProducts.slice((page - 1) * 3, page * 3)}
              />
              <Stack spacing={2}>
                {/* <Typography>Page: {page}</Typography> */}
                <Pagination
                  count={Math.ceil(filteredProducts.length / 3)}
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
