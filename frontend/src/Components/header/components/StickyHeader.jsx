import React, { useEffect } from "react";

import { useSubCatData } from "../../../Features/categories/Context";
import logo from "../../../assets/img/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useCustomer } from "../../../Features/customers/Context";
import { CartStore } from "../../../Features/cart/components/State/CartContext";
import LogoutIcon from "@mui/icons-material/Logout";
const StickyHeader = () => {
  const navigate = useNavigate();
  const { catData, SubcatData, setSelectedSubcategory, selectedSubcategory } =
    useSubCatData();
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  useEffect(() => {
    let storedCart = null;
    const cartOrders = localStorage.getItem("CartOrders");
    const shopOrders = localStorage.getItem("ShopOrders");

    try {
      storedCart = JSON.parse(cartOrders);
    } catch (error) {
      console.error("Error parsing CartOrders:", error);
    }

    if (!storedCart) {
      try {
        storedCart = JSON.parse(shopOrders);
      } catch (error) {
        console.error("Error parsing ShopOrders:", error);
      }
    }

    if (storedCart !== null) {
      dispatch({ type: "SET_TO_CART", payload: storedCart });
    }
  }, []);
  const handleClick = (id) => () => {
    setSelectedSubcategory(id);
  };
  return (
    <div
      id="sticky-header"
      className="main-header menu-area transparent-header"
    >
      <div className="container custom-container-two">
        <div className="row">
          <div className="col-12">
            <div className="mobile-nav-toggler">
              <i className="fas fa-bars"></i>
            </div>
            <div className="menu-wrap">
              <nav className="menu-nav show">
                <div className="logo">
                  <Link to="/home">
                    <img src={logo} height="50px" alt="Logo" />
                  </Link>
                </div>
                <div className="navbar-wrap main-menu d-none d-lg-flex">
                  <ul className="navigation">
                    {catData.slice(-4)?.map((category, i) => {
                      const subcaty = SubcatData?.filter(
                        (subcategory) =>
                          subcategory?.categoryId?._id === category?._id
                      );
                      return (
                        <li
                          key={i}
                          className="active menu-item-has-children has--mega--menu"
                        >
                          {/* <a href="#">✦ {category?.categoryName} ✦</a> */}
                          <Link to={`/shop?category=${category?._id}`}>
                            ✦ {category?.categoryName} ✦
                          </Link>
                          <ul className="mega-menu">
                            <li className="mega-menu-wrap">
                              <ul className="mega-menu-col">
                                <li className="mega-title">
                                  <a href="#">All Categories</a>
                                </li>
                                {subcaty?.map((subcategory) => {
                                  return (
                                    <li key={subcategory?.id}>
                                      <Link
                                        to="/shop"
                                        onClick={handleClick(subcategory.id)}
                                      >
                                        {subcategory.subCategoryName}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="header-action d-none d-md-block">
                  <ul>
                    <li className="header-profile">
                      <Link to="/customerProfile" data-toggle="modal">
                        <i className="flaticon-user"></i>
                      </Link>
                    </li>
                    <li className="header-shop-cart">
                      <Link to="/cart">
                        <i className="flaticon-shopping-bag"></i>
                        <span>{qty}</span>
                      </Link>
                      <ul className="minicart">
                        {shoppingCart.length > 0 &&
                          shoppingCart.map((product) => (
                            <li
                              className="d-flex align-items-start"
                              key={product._id}
                            >
                              <div className="cart-img">
                                <a href="#">
                                  <img src={product.images[0]} alt="" />
                                </a>
                              </div>
                              <div className="cart-content">
                                <h4>
                                  <a href="#">{product.productName}</a>
                                </h4>
                                <div className="cart-price">
                                  <span className="new">
                                    ${product.RealPrice.toFixed(2)}
                                  </span>
                                  {/* Add your logic for displaying discounted price here */}
                                  {/* <span>
                                    <del>${product.options[0].oldPrice}</del>
                                  </span> */}
                                </div>
                              </div>
                              <button
                                className="del-icon"
                                onClick={() =>
                                  dispatch({
                                    type: "DELETE_PRODUCT",
                                    id: product._id,
                                  })
                                }
                              >
                                <i className="far fa-trash-alt"></i>
                              </button>
                            </li>
                          ))}
                        <li>
                          <div className="total-price">
                            <span className="f-left">Total:</span>
                            <span className="f-right">
                              {totalPrice.toFixed(2)} $
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="checkout-link">
                            <Link to="/cart">Shopping Cart</Link>
                            <Link className="black-color" to="/checkout">
                              Checkout
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="header-wishlist">
                      {localStorage.getItem("customerToken") && (
                        <Link
                          to="/home"
                          onClick={() => {
                            localStorage.removeItem("customerToken");
                          }}
                        >
                          Logout
                        </Link>
                      )}
                    </li>
                    <li className="sidebar-toggle-btn">
                      <a href="#" className="navSidebar-button">
                        <i className="flaticon-menu-button-of-three-horizontal-lines"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            {/* <!-- Mobile Menu  --> */}
            <div className="mobile-menu">
              <div className="close-btn">
                <i className="flaticon-targeting-cross"></i>
              </div>
              <nav className="menu-box">
                <div className="nav-logo">
                  <a href="index.html">
                    <img
                      src="img/logo/logo.png"
                      height="50px"
                      alt=""
                      title=""
                    />
                  </a>
                </div>
                <div className="menu-outer">
                  <ul className="navigation">
                    <li className="active menu-item-has-children">
                      <a href="#">Home</a>
                      <ul className="submenu">
                        <li>
                          <a href="index.html">Home One</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home Two</a>
                        </li>
                        <li>
                          <a href="index-3.html">Home Three</a>
                        </li>
                        <li>
                          <a href="index-4.html">Home Four</a>
                        </li>
                        <li>
                          <a href="index-5.html">Home Five</a>
                        </li>
                        <li>
                          <a href="index-6.html">Home Six</a>
                        </li>
                        <li className="active">
                          <a href="index-7.html">Home Seven</a>
                        </li>
                        <li>
                          <a href="index-8.html">Home Eight</a>
                        </li>
                        <li>
                          <a href="index-9.html">Home Nine</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#">Shop</a>
                      <ul className="submenu">
                        <li>
                          <a href="shop.html">Shop Page</a>
                        </li>
                        <li>
                          <a href="shop-sidebar.html">Shop Sidebar</a>
                        </li>
                        <li>
                          <a href="shop-details.html">Shop Details</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart Page</a>
                        </li>
                        <li>
                          <a href="cart.html">Checkout Page</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#">blog</a>
                      <ul className="submenu">
                        <li>
                          <a href="blog.html">Our Blog</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className="social-links">
                  <ul className="clearfix">
                    <li>
                      <a href="#">
                        <span className="fab fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-facebook-square"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-pinterest-p"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-instagram"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-youtube"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="menu-backdrop"></div>
            {/* <!-- End Mobile Menu --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
