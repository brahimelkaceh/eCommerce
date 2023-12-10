import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartStore } from "../../cart/components/State/CartContext";
import { useFormik } from "formik";
import { createOrder } from "../service";
import * as Yup from "yup";
const Main = () => {
  const { qty, shoppingCart, totalPrice, dispatch } = CartStore();
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   const jwt = localStorage.customerId;

  //   const orderItems = shoppingCart.map((product) => ({
  //     product: product._id,
  //     quantity: product.orderQty,
  //     productName: product.productName,
  //     productPrice: product.options[0].price,
  //     quantity: product.quantity,
  //   }));
  //   const order = {
  //     customerID: JSON.parse(jwt),
  //     orderItems: orderItems,
  //     cartTotalPrice: totalPrice,
  //     Status: "Open",
  //   };
  //   console.log(order);
  //   // createOrder(order)
  // };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalZip: "",
      email: "",
      phoneNumber: "",
      note: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      address: Yup.string().required("address is required"),
      city: Yup.string().required("city is required"),
      postalZip: Yup.string().required("postalZip is required"),
      phoneNumber: Yup.string().required("phoneNumber  is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: async (values) => {
      // console.log(values);
      const jwt = localStorage.customerId;
      const orderItems = shoppingCart.map((product) => ({
        product: product._id,
        productName: product.productName,
        productPrice: product.options[0].price,
        quantity: product.orderQty,
      }));
      const order = {
        ...values,
        customerID: JSON.parse(jwt),
        orderItems: orderItems,
        cartTotalPrice: totalPrice,
        Status: "Open",
      };
      if (orderItems.length) {
        createOrder(order);
        console.log("order send successfully", order);
        localStorage.removeItem("ShopOrders");
        localStorage.removeItem("CartOrders");
        dispatch({ type: "SET_TO_CART", payload: [] });
        formik.handleReset();
      } else {
        console.log("there is no order to send");
      }
    },
  });
  return (
    <main>
      {/* breadcrumb-area */}
      <section
        className="breadcrumb-area breadcrumb-bg"
        style={{width:"100%" , backgroundSize: 'cover', backgroundImage: `url('src/assets/img/bg/3.png')`}}>
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
          <form
            onSubmit={formik.handleSubmit}
            className="row justify-content-center"
          >
            <div className="col-lg-7">
              <div className="checkout-wrap">
                <div className="checkout-top">
                  <h5 className="title">Billing details</h5>
                  <Link to="/cart" className="back">
                    <i className="fas fa-angle-left" /> -- Back to Cart
                  </Link>
                </div>
                <div className="checkout-form">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label htmlFor="firstName">
                          FIRST NAME <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="input"
                          name="firstName" // Connect the input to the corresponding Formik field
                          value={formik.values.firstName} // Set value from Formik state
                          onChange={formik.handleChange} // Handle change using Formik's handleChange
                        />
                        {formik.errors.firstName && (
                          <div className="required-msg">
                            {formik.errors.firstName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label htmlFor="lastName">
                          Last NAME <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="input"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.lastName && (
                          <div className="required-msg">
                            {formik.errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="address">
                          STREET ADDRESS <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="input"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.address && (
                          <div className="required-msg">
                            {formik.errors.address}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-grp">
                        <label>
                          CITY <span>*</span>
                        </label>
                        <select
                          className="custom-select"
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                        >
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
                        <label htmlFor="postalZip">
                          postal ZIP <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="postalZip"
                          className="input"
                          name="postalZip"
                          value={formik.values.postalZip}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.postalZip && (
                          <div className="required-msg">
                            {formik.errors.postalZip}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-grp">
                        <label htmlFor="phoneNumber">
                          Your PHONE <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="phoneNumber"
                          className="input"
                          name="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.phoneNumber && (
                          <div className="required-msg">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="email">
                          EMAIL ADDRESS <span>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="input"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && (
                          <div className="required-msg">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-grp mb-0">
                        <label htmlFor="note">
                          ORDER you have NOTES <small>(OPTIONAL)</small>
                        </label>
                        <textarea
                          name="note"
                          id="note"
                          placeholder="About Your Special Delivery Notes"
                          defaultValue={""}
                          value={formik.values.note}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <aside className="checkout-sidebar">
                <h6 className="title">Cart Totals</h6>
                <div className="shop-cart-widget">
                  <div>
                    <ul>
                      <li className="sub-total">
                        <span>Products Quantity</span> {qty}
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
                        <span className="amount">{totalPrice} $</span>
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
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </section>
      {/* checkout-area-end */}
    </main>
  );
};

export default Main;
