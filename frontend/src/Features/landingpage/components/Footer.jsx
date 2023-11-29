import React from "react";

const Footer = () => {
  return (
    <footer className="gray-bg footer-style-two pt-75">
      <div className="container">
        <div className="footer-top-wrap">
          <div className="row">
            <div className="col-12">
              <div className="footer-logo">
                <a href="index.html">
                  <img src="img/logo/logo-white.png" height="80px" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle-wrap pt-45 pb-20">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget mb-50">
                <h4 className="fw-title">BRAND</h4>
                <div className="fw-link">
                  <ul>
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                    <li>
                      <a href="shop.html">Store Locations</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget mb-50">
                <h4 className="fw-title">STORE</h4>
                <div className="fw-link">
                  <ul>
                    <li>
                      <a href="#">Order Tracking</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget mb-50">
                <h4 className="fw-title">Category</h4>
                <div className="fw-link">
                  <ul>
                    <li>
                      <a href="shop-sidebar.html">Homeware</a>
                    </li>
                    <li>
                      <a href="shop-sidebar.html">Lifestyle</a>
                    </li>
                    <li>
                      <a href="shop-sidebar.html">Accessories</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget mb-50">
                <h4 className="fw-title">FOLLOW US</h4>
                <div className="footer-text">
                  <p>Get Free Shipping on all your orders!</p>
                  <div className="footer-social">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
