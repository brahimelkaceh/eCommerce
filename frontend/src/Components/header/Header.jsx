import React from "react";
import StickyHeader from "./components/StickyHeader";

const Header = () => {
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
                    <a href="#latest-arrival"> Shop the latest arrivals</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="header-top-right">
                <div className="lang">
                  <select name="select" disabled>
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
      {/* Sticky Header */}
      <StickyHeader />
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
              <input
                className="input"
                type="text"
                placeholder="Search here..."
              />
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
                      <input
                        className="input"
                        type="email"
                        placeholder="Email..."
                      />
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
