import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCustomer } from "../../customers/Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, TextField } from "@mui/material";
import { editCustomer } from "../../customers/service";
import SuccessAlert from "../../customerlogin/components/SuccessAlert";

const Main = () => {
  const { customer, getCustomerById } = useCustomer();
  const customerId = JSON.parse(localStorage.getItem("customerId"));
  const [loading, isLoading] = useState(false);
  const [open, isOpen] = useState(false);
  useEffect(() => {
    getCustomerById(customerId);
  }, [customerId]);
  console.log(customer);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      image: Yup.mixed().test(
        "fileSize",
        "Image size is too large",
        (value) => {
          if (!value) return true; // Allow empty value (no file selected)
          return value.size <= 1048576; // 1 MB
        }
      ),
    }),
    onSubmit: async (values) => {
      isLoading(true);
      try {
        const response = await editCustomer(customerId, values);
        if (response.status) {
          isLoading(false);
          isOpen(true);
        }
      } catch (error) {
        console.error(error);
        isLoading(false);
      } finally {
        isLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      firstName: customer.firstName,
      lastName: customer?.lastName,
      userName: customer?.userName,
      email: customer.email,
    });
  }, [customer]);

  const handleClose = () => {
    isOpen(false);
  };

  return (
    <main>
      {/* breadcrumb-area-end */}
      {/* checkout-area */}
      {open && (
        <SuccessAlert
          handleClose={handleClose}
          open={open}
          message="Profile updated success"
        />
      )}
      <section className="checkout-area pt-95 pb-95">
        <div className="container">
          <form
            className="row justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-lg-7">
              <div className="checkout-wrap">
                <div className="checkout-top">
                  <h5 className="title">Personal details</h5>
                  <Link to="/home" className="back">
                    <i className="fas fa-angle-left" /> -- Back to Home
                  </Link>
                </div>

                <div className="checkout-form">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-grp">
                        <label htmlFor="fName">FIRST NAME</label>
                        <input
                          className="input"
                          type="text"
                          id="fName"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.firstName && (
                          <span className="required-msg">
                            {formik.errors.firstName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-grp">
                        <label htmlFor="lName">Last NAME</label>
                        <input
                          type="text"
                          className="input"
                          id="lName"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.lastName && (
                          <span className="required-msg">
                            {formik.errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="uName">User Name</label>
                        <input
                          type="text"
                          id="uName"
                          name="userName"
                          className="input"
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.userName && (
                          <span className="required-msg">
                            {formik.errors.userName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-grp">
                        <label htmlFor="email">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="input"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <aside className="checkout-sidebar">
                <h6 className="title">Personal Image</h6>
                <div className="shop-cart-widget">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "4px",
                          objectFit: "cover", // Ensure the image covers the entire container
                        }}
                        src={
                          formik?.values?.images instanceof Blob
                            ? URL.createObjectURL(formik?.values?.images)
                            : (customer?.images && customer?.images[0]) || ""
                        }
                        // src={customer?.images[0]}
                        alt={formik?.values?.images}
                        srcSet=""
                      />
                    </div>
                    <label htmlFor="file" className="input-file btn">
                      <input
                        type="file"
                        id="file"
                        name="images"
                        onChange={(e) => {
                          // ();
                          formik.setFieldValue("images", e.target.files[0]); // Set the image file directly
                          // setUpdatedImg(formik.values?.images?.name);
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                          stroke="#fffffff"
                          strokeWidth="2"
                        ></path>
                        <path
                          d="M17 15V18M17 21V18M17 18H14M17 18H20"
                          stroke="#fffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      ADD IMAGE
                    </label>
                  </div>
                </div>
              </aside>
            </div>
            <button type="submit" className="submit-button col-lg-2 col-md-5 ">
              {loading ? "loading..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
      {/* checkout-area-end */}
    </main>
  );
};

export default Main;
