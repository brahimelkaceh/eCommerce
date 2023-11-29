import React, { useState, useEffect, useRef, useContext } from "react";
import "./Form.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [isActive, setActive] = useState(false);
  const [buttonclicked, setbuttonclicked] = useState(true);
  const buttonref = useRef(null);

  // useEffect(()=>{
  //   if(buttonref.current && buttonclicked) {
  //     console.log('clicked')
  //     buttonref.current.click()

  //   }
  // },[buttonclicked])

  const handleSignup = async (e) => {
    e.preventDefault();
    const up_name = document.getElementById("up_name").value;
    const up_email = document.getElementById("up_email").value;
    const up_password = document.getElementById("up_password").value;
    const up_file = document.getElementById("up_file").files[0];

    const formData = new FormData();
    formData.append("username", up_name);
    formData.append("email", up_email);
    formData.append("password", up_password);
    formData.append("avatar", up_file);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Set the correct Content-Type header
          "Content-Type": "multipart/form-data", // Set the correct Content-Type header
        },
      };

      const response = await axios.post(
        "http://localhost:3005/register",
        formData
      );

      const { fullname, id } = response.data;
      if (fullname) {
        buttonref.current.click();
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    // const in_email = document.getElementById('in_email')
    // const in_password = document.getElementById('in_password')
    // const response = await fetch('http://localhost:3005/login',{
    //     method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             email: in_email.value,
    //             password: in_password.value
    //         })
    //     })
    // const data = await response.json();
    // setusername(data.fullname)
    // setid(data.userId)
    // setToken(data.token)
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

  return (
    <div className={`app__form cnt ${isActive ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <input type="text" id="up_name" placeholder="Username" />
          <input type="email" id="up_email" placeholder="Email" />
          <input type="password" id="up_password" placeholder="Password" />
          <input type="file" id="up_file" placeholder="Enter your image" />
          <button onClick={(e) => handleSignup(e)}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <input type="email" id="in_email" placeholder="Email" />
          <input type="password" id="in_password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button onClick={(e) => handleSignin(e)}>Sign In</button>
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
  );
};

export default LoginAdmin;
