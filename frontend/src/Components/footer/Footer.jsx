import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/img/logo/logo-white.png";
import { useSubCatData } from "../../Features/categories/Context";
const Footer = () => {
  const { catData } = useSubCatData();

  return (
    <footer className="gray-bg footer-style-two pt-75">
      <div className="container">
        <div className="footer-top-wrap">
          <div className="row">
            <div className="col-12">
              <div className="footer-logo">
                <Link to="/home">
                  <img src={logoWhite} height="80px" alt="" />
                </Link>
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
                    {catData?.slice(0, 3)?.map((category) => (
                      <li key={category.id}>
                        <Link to="" href="shop-sidebar.html">
                          {category.categoryName}
                        </Link>
                      </li>
                    ))}
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
