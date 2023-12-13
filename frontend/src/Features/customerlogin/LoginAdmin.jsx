import React, { useState, useEffect, useRef, useContext } from "react";
import "./Form.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../customers/Context";
import { ErrorMessage, useFormik } from "formik";
import { initialValues, validationSchema } from "./loginPameters/FormSettings";
import TextField from "@mui/material/TextField";
import SuccessAlert from "./components/SuccessAlert";
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import * as Yup from "yup";
import ErrorAlert from "./components/ErrorAlert";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [loading, isLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const buttonref = useRef(null);

  const { loginCustomer } = useCustomer();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setClose(false);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      handleSignup(values);
    },
  });

  const loginForm = useFormik({
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
      handleSignin(values);
    },
  });

  const handleSignup = async (formData) => {
    // console.log(formData);
    // return;
    // e.preventDefault();
    // const formData = new FormData();
    // Object.entries(formValues).forEach(([key, value]) => {
    //   if (key === "images") {
    //     for (let i = 0; i < value.length; i++) {
    //       console.log("image", value[i]);
    //       formData.append("images", value[i]);
    //     }
    //   } else {
    //     formData.append(key, value);
    //   }
    // });
    isLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/customers/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Signup successful:", response.data?.status);

      if (response.data?.status == "success") {
        handleClick();
        formik.handleReset();
        setActive(false);
        isLoading(false);
        setAlertMessage("Congratulations on Your Successful Registration!");
        setMessage("Please check your email!!");
      }
    } catch (error) {
      isLoading(false);

      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    function handleSignUpClick() {
      setActive(true);
    }

    function handleSignInClick() {
      setActive(false);
    }

    signUpButton.addEventListener("click", handleSignUpClick);
    signInButton.addEventListener("click", handleSignInClick);

    return () => {
      signUpButton.removeEventListener("click", handleSignUpClick);
      signInButton.removeEventListener("click", handleSignInClick);
    };
  }, []);

  const handleSignin = async (formData) => {
    isLoading(true);
    try {
      const response = await loginCustomer(formData.email, formData.password);
      if (response.status == "success") {
        setOpen(true);
        setAlertMessage("Congratulations on Your Successful Login!");
        isLoading(false);
        navigate("/home");
      }
      if (response.status === "fail") {
        console.log("error:", response);
        setAlertMessage(
          "Email or password is not correct. Please check your credentials."
        );
        setClose(true);
        isLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      {open && (
        <SuccessAlert
          handleClose={handleClose}
          open={open}
          message={alertMessage}
        />
      )}
      {close && (
        <ErrorAlert
          handleClose={handleClose}
          open={close}
          message={alertMessage}
        />
      )}
      <div className={`app__form cnt ${isActive ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          {loading && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
          <form onSubmit={formik.handleSubmit}>
            <h1>Create Account</h1>
            <TextField
              type="text"
              className="input-field"
              size="small"
              name="userName"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />

            <TextField
              type="text"
              className="input-field"
              size="small"
              name="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              className="input-field"
              size="small"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              className="input-field"
              size="small"
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className="input-field"
              size="small"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              className="input-field"
              size="small"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              value={formik.passwordConfirm}
              error={
                formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm)
              }
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
            />
            {/* <input
            type="file"
            name="images"
            placeholder="Enter your image"
            onChange={handleInputChange}
          /> */}
            <button
              type="submit"
              // onClick={handleSignup}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          {loading && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
          <form onSubmit={loginForm.handleSubmit}>
            <h1>Sign in</h1>
            <TextField
              size="small"
              className="input-field"
              type="email"
              name="email"
              id="in_email"
              placeholder="Email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              error={loginForm.touched.email && Boolean(loginForm.errors.email)}
              helperText={loginForm.touched.email && loginForm.errors.email}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              error={
                loginForm.touched.password && Boolean(loginForm.errors.password)
              }
              helperText={
                loginForm.touched.password && loginForm.errors.password
              }
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
              target="_blank"
            >
              {message}
            </a>
            <button
              // onClick={handleSignin}
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" ref={buttonref}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
