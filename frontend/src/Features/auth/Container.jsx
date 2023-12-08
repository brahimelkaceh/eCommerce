import React from "react";
import "./style.css";
import { useState } from "react";
import { UserC } from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, TextField } from "@mui/material";
import SuccessAlert from "../../Components/alerts/SuccessAlert";

const Container = () => {
  const navigate = useNavigate();
  const { setusername, setrole } = UserC();
  const [formdata, setformdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handlesubmit(values);
    },
  });

  const handlesubmit = async (formdata) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/users/login`,
        formdata
      );
      localStorage.setItem("userT", JSON.stringify(response.data.data));
      setrole(response.data.user.role);
      setusername(response.data.user.userName);
      setOpen(true);
      setAlertMessage("Congratulations on Your Successful Login!");
      navigate("/");
    } catch (error) {
      // Handle error if the request fails
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-page-container">
      {open && (
        <SuccessAlert
          handleClose={handleClose}
          open={open}
          message={alertMessage}
        />
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="login wrap">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="h1">Login</div>
            {loading && <Loader />}
          </div>
          <Input
            className="input"
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            size="small"
            // onChange={handlechange}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <div className="required-msg">{formik.errors.email}</div>
          )}
          <Input
            className="input"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            // onChange={handlechange}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <div className="required-msg">{formik.errors.password}</div>
          )}
          <button defaultValue="Login" className="login-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Container;
