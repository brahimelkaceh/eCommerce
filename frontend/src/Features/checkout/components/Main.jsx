import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main>
      {/* breadcrumb-area */}
      <section
        className="breadcrumb-area breadcrumb-bg"
        data-background="img/bg/breadcrumb_bg03.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2>Checkout Page</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* breadcrumb-area-end */}
      {/* checkout-area */}
      <section className="checkout-area pt-95 pb-95">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="checkout-wrap">
                <div className="checkout-top">
                  <h5 className="title">Billing details</h5>
                  <Link to="/cart" className="back">
                    <i className="fas fa-angle-left" /> -- Back to Cart
                  </Link>
                </div>
                <form action="#" className="checkout-form">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label htmlFor="fName">
                          FIRST NAME <span>*</span>
                        </label>
                        <input type="text" id="fName" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label htmlFor="lName">
                          Last NAME <span>*</span>
                        </label>
                        <input type="text" id="lName" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="address">
                          STREET ADDRESS <span>*</span>
                        </label>
                        <input type="text" id="address" />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label>
                          CITY <span>*</span>
                        </label>
                        <select className="custom-select">
                          <option value="Illinois">Illinois</option>
                          <option value="New York">New York</option>
                          <option value="California">California</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Houston">Houston</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label htmlFor="zip">
                          postal ZIP <span>*</span>
                        </label>
                        <input type="text" id="zip" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-grp">
                        <label htmlFor="phone">
                          Your PHONE <span>*</span>
                        </label>
                        <input type="text" id="phone" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="email">
                          EMAIL ADDRESS <span>*</span>
                        </label>
                        <input type="email" id="email" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-grp mb-0">
                        <label htmlFor="message">
                          ORDER you have NOTES <small>(OPTIONAL)</small>
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          placeholder="About Your Special Delivery Notes"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <aside className="checkout-sidebar">
                <h6 className="title">Cart Totals</h6>
                <div className="shop-cart-widget">
                  <form action="#">
                    <ul>
                      <li className="sub-total">
                        <span>SUBTOTAL</span> $ 136.00
                      </li>
                      <li>
                        <span>SHIPPING</span>
                        <div className="shop-check-wrap">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                              checked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              FREE SHIPPING
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="cart-total-amount">
                        <span>TOTAL</span>
                        <span className="amount">$ 151.00</span>
                      </li>
                    </ul>
                    <div className="payment-method-info">
                      <div className="paypal-method-flex">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck5"
                            checked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck5"
                          >
                            Cash on delivery
                          </label>
                          <p>Pay with cash upon delivery.</p>
                        </div>
                      </div>
                    </div>
                    <div className="payment-terms">
                      <p>
                        The purpose Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore
                      </p>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck7"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck7"
                        >
                          I have read and agree to the website terms and
                          conditions
                        </label>
                      </div>
                    </div>
                    <button className="btn">Place order</button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      {/* checkout-area-end */}
    </main>
  );
};

export default Main;
