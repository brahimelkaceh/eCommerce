import React from 'react'

const CartTotals = () => {
  return (
    <main>
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
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              FLAT RATE: $15
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              FREE SHIPPING
                            </label>
                          </div>
                          <a href="#" className="calculate">
                            Calculate shipping
                          </a>
                        </div>
                      </li>
                      <li className="cart-total-amount">
                        <span>TOTAL</span>{" "}
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
                      <div className="paypal-method-flex">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck6"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck6"
                          >
                            Payments on Card
                          </label>
                        </div>
                        <div className="paypal-logo">
                          <img src="img/images/card.png" alt />
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
    </main>
  )
}

export default CartTotals
