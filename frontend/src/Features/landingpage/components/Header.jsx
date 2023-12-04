import React from "react";
import { CartStore } from "../../cart/components/State/CartContext";
import { useEffect } from "react";
const Header = () => {
    const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  useEffect(() => {
    let storedCart = null;
    const cartOrders = localStorage.getItem("CartOrders");
    const shopOrders = localStorage.getItem("ShopOrders");

    try {
      storedCart = JSON.parse(cartOrders);
      console.log("StoredCart from CartOrders", storedCart);
    } catch (error) {
      console.error("Error parsing CartOrders:", error);
    }

    if (!storedCart) {
      try {
        storedCart = JSON.parse(shopOrders);
        console.log("StoredCart from ShopOrders", storedCart);
      } catch (error) {
        console.error("Error parsing ShopOrders:", error);
      }
    }

    if (storedCart !== null) {
      dispatch({ type: "SET_TO_CART", payload: storedCart });
    }
  }, []);

  return (
    <header className="header-style-six">
      <div className="header-top-wrap d-none d-md-block">
        <div className="container custom-container-two">
          <div className="row align-items-center justify-content-center">
            <div className="col-sm-6">
              <div className="header-top-link">
                <ul>
                  <li>
                    <span> What’s new? A LOT </span>
                  </li>
                  <li>
                    <a href="#"> Shop the latest arrivals</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="header-top-right">
                <div className="lang">
                  <select name="select">
                    <option value="">English</option>
                    <option value="">Spanish</option>
                    <option value="">Turkish</option>
                    <option value="">Russian</option>
                    <option value="">Chinese</option>
                  </select>
                </div>
                <div className="currency">
                  <form action="#">
                    <select name="select">
                      <option value="">USD</option>
                      <option value="">AUE</option>
                      <option value="">SAR</option>
                      <option value="">INR</option>
                      <option value="">BDT</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    <a href="index.html">
                      <img src="img/logo/logo.png" height="50px" alt="Logo" />
                    </a>
                  </div>
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li className="active menu-item-has-children has--mega--menu">
                        <a href="#">Homeware</a>
                        <ul className="mega-menu">
                          <li className="mega-menu-wrap">
                            <ul className="mega-menu-col">
                              <li className="mega-title">
                                <a href="shop.html">All Categories</a>
                              </li>
                              <li>
                                <a href="shop-details.html">Furniture</a>
                              </li>
                              <li>
                                <a href="cart.html">Artifact</a>
                              </li>
                              <li>
                                <a href="checkout.html">Wall Art</a>
                              </li>
                            </ul>
                            <ul className="mega-menu-col sub-cat-post">
                              <li>
                                <a href="shop-sidebar.html">
                                  <img
                                    src="img/product/sub_menu_img01.jpg"
                                    alt=""
                                  />
                                  <span className="btn">Shop Now</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="has--mega--menu">
                        <a href="#">Lifestyle</a>
                        <ul className="mega-menu">
                          <li className="mega-menu-wrap">
                            <ul className="mega-menu-col">
                              <li className="mega-title">
                                <a href="shop.html">All Categories</a>
                              </li>
                              <li>
                                <a href="shop-details.html">Electronics</a>
                              </li>
                              <li>
                                <a href="cart.html">Desk Supplies</a>
                              </li>
                              <li>
                                <a href="checkout.html">Music</a>
                              </li>
                            </ul>
                            <ul className="mega-menu-col sub-cat-post">
                              <li>
                                <a href="shop-sidebar.html">
                                  <img
                                    src="img/product/sub_menu_img01.jpg"
                                    alt=""
                                  />
                                  <span className="btn">Shop Now</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li className="has--mega--menu">
                        <a href="#">Accessories</a>
                        <ul className="mega-menu">
                          <li className="mega-menu-wrap">
                            <ul className="mega-menu-col">
                              <li className="mega-title">
                                <a href="shop.html">All Categories</a>
                              </li>
                              <li>
                                <a href="shop-sidebar.html">Bags</a>
                              </li>
                              <li>
                                <a href="shop.html">Caps & Scarves</a>
                              </li>
                              <li>
                                <a href="shop-details.html">Sunglasses</a>
                              </li>
                            </ul>
                            <ul className="mega-menu-col sub-cat-post">
                              <li>
                                <a href="shop-sidebar.html">
                                  <img
                                    src="img/product/sub_menu_img01.jpg"
                                    alt=""
                                  />
                                  <span className="btn">Shop Now</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li className="has--mega--menu">
                        <a href="#">✦ Gifts ✦</a>
                        <ul className="mega-menu">
                          <li className="mega-menu-wrap">
                            <ul className="mega-menu-col">
                              <li className="mega-title">
                                <a href="shop.html">All Categories</a>
                              </li>
                              <li>
                                <a href="shop-sidebar.html">Gift Sets</a>
                              </li>
                              <li>
                                <a href="shop-sidebar.html">Luxe Gifts</a>
                              </li>
                              <li>
                                <a href="shop.html">Responsible Gifts</a>
                              </li>
                            </ul>
                            <ul className="mega-menu-col sub-cat-post">
                              <li>
                                <a href="shop-sidebar.html">
                                  <img
                                    src="img/product/sub_menu_img01.jpg"
                                    alt=""
                                  />
                                  <span className="btn">Shop Now</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="header-action d-none d-md-block">
                    <ul>
                      <li className="header-search">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#search-modal"
                        >
                          <i className="flaticon-search"></i>
                        </a>
                      </li>
                      <li className="header-profile">
                        <a href="#">
                          <i className="flaticon-user"></i>
                        </a>
                      </li>
                      <li className="header-wishlist">
                        <a href="#">
                          <i className="flaticon-heart-shape-outline"></i>
                        </a>
                      </li>
                      <li className="header-shop-cart">
                        <a href="#">
                          <i className="flaticon-shopping-bag"></i>
                          <span>{qty}</span>
                        </a>
                        <ul className="minicart">
                          {/* <li className="d-flex align-items-start">
                            <div className="cart-img">
                              <a href="#">
                                <img src="img/product/cart_p01.jpg" alt="" />
                              </a>
                            </div>
                            <div className="cart-content">
                              <h4>
                                <a href="#">Exclusive Winter Jackets</a>
                              </h4>
                              <div className="cart-price">
                                <span className="new">$229.9</span>
                                <span>
                                  <del>$229.9</del>
                                </span>
                              </div>
                            </div>
                            <div className="del-icon">
                              <a href="#">
                                <i className="far fa-trash-alt"></i>
                              </a>
                            </div>
                          </li>
                          <li className="d-flex align-items-start">
                            <div className="cart-img">
                              <a href="#">
                                <img src="img/product/cart_p02.jpg" alt="" />
                              </a>
                            </div>
                            <div className="cart-content">
                              <h4>
                                <a href="#">Winter Jackets For Women</a>
                              </h4>
                              <div className="cart-price">
                                <span className="new">$229.9</span>
                                <span>
                                  <del>$229.9</del>
                                </span>
                              </div>
                            </div>
                            <div className="del-icon">
                              <a href="#">
                                <i className="far fa-trash-alt"></i>
                              </a>
                            </div>
                          </li> */}
                          {shoppingCart.length > 0 &&
                            shoppingCart.map((product) => (
                              <li
                                className="d-flex align-items-start"
                                key={product._id}
                              >
                                <div className="cart-img">
                                  <a href="#">
                                    <img
                                      src={product.images[0]}
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="cart-content">
                                  <h4>
                                    <a href="#">{product.productName}</a>
                                  </h4>
                                  <div className="cart-price">
                                    <span className="new">
                                      ${product.options[0].price}
                                    </span>
                                    {/* Add your logic for displaying discounted price here */}
                                    <span>
                                      <del>${product.options[0].oldPrice}</del>
                                    </span>
                                  </div>
                                </div>
                                <div className="del-icon">
                                  <button
                                    onClick={() =>
                                      dispatch({
                                        type: "DELETE_PRODUCT",
                                        id: product._id,
                                      })
                                    }
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </button>
                                </div>
                              </li>
                            ))}

                          <li>
                            <div className="total-price">
                              <span className="f-left">Total:</span>
                              <span className="f-right">{totalPrice} $</span>
                            </div>
                          </li>
                          <li>
                            <div className="checkout-link">
                              <a href="cart">Shopping Cart</a>
                              <a className="black-color" href="#">
                                Checkout
                              </a>
                            </div>
                          </li>
                        </ul>
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

      {/* <!-- Modal Search --> */}
      <div
        className="modal fade"
        id="search-modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form>
              <input type="text" placeholder="Search here..." />
              <button>
                <i className="flaticon-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- Modal Search-end --> */}

      {/* <!-- off-canvas-start --> */}
      <div className="sidebar-off-canvas info-group">
        <div className="off-canvas-overlay"></div>
        <div className="off-canvas-widget scroll">
          <div className="sidebar-widget-container">
            <div className="off-canvas-heading">
              <a href="#" className="close-side-widget">
                <span className="flaticon-targeting-cross"></span>
              </a>
            </div>
            <div className="sidebar-textwidget">
              <div className="sidebar-info-contents">
                <div className="content-inner">
                  <div className="logo mb-30">
                    <a href="index.html">
                      <img src="img/logo/logo.png" height="80px" alt="" />
                    </a>
                  </div>
                  <div className="content-box">
                    <p>
                      Explore our curated collection of vintage treasures and
                      unique finds...
                    </p>
                  </div>
                  <div className="contact-info">
                    <h4 className="title">CONTACT US</h4>
                    <ul>
                      <li>
                        <span className="flaticon-phone-call"></span>
                        <a href="tel:123456789">+9 911 121 0000</a>
                      </li>
                      <li>
                        <span className="flaticon-email"></span>
                        <a href="mailto:adara@info.com">urbangoodiz@info.com</a>
                      </li>
                      <li>
                        <span className="flaticon-place"></span>71 South Park
                        Street 2355 NY
                      </li>
                    </ul>
                  </div>
                  <div className="oc-newsletter">
                    <h4 className="title">NEWSLETTER</h4>
                    <p>Fill your email below to subscribe to my newsletter</p>
                    <form action="#">
                      <input type="email" placeholder="Email..." />
                      <button className="btn">Subscribe</button>
                    </form>
                  </div>
                  <div className="oc-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-google"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="oc-bottom">
                    <div className="currency">
                      <form action="#">
                        <label>Currency</label>
                        <select name="select">
                          <option value="">USD</option>
                          <option value="">AUE</option>
                          <option value="">SAR</option>
                          <option value="">INR</option>
                          <option value="">BDT</option>
                        </select>
                      </form>
                    </div>
                    <div className="language">
                      <form action="#">
                        <label>Language</label>
                        <select name="select">
                          <option value="">English</option>
                          <option value="">Spanish</option>
                          <option value="">Turkish</option>
                          <option value="">Russian</option>
                          <option value="">Chinese</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- off-canvas-end --> */}
    </header>
  );
};

export default Header;
