import React, { useState, useEffect, useRef, useContext } from "react";
import "./Form.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../customers/Context";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [buttonclicked, setbuttonclicked] = useState(true);
  const buttonref = useRef(null);

  const { loginCustomer } = useCustomer();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = type === "file" ? files : value;
    setFormValues({
      ...formValues,
      [name]: updatedValue,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          console.log("image", value[i]);
          formData.append("images", value[i]);
        }
      } else {
        formData.append(key, value);
      }
    });

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
      console.log("Signup successful:", response.data);
      navigate("/shop");
    } catch (error) {
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

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      const response = await loginCustomer(email, password);
      console.log("Login successful:", response.data);
      navigate("/shop");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={`app__form cnt ${isActive ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        {/* <form action="#">
          <h1>Create Account</h1>
          <input
            type="text"
            id="up_firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="up_lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            id="up_username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            id="up_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="up_password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="up_confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="file"
            id="up_image"
            placeholder="Enter your image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={handleSignup}>Sign Up</button>
        </form> */}
        <form>
          <h1>Create Account</h1>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="images"
            placeholder="Enter your image"
            onChange={handleInputChange}
          />
          <button onClick={handleSignup}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <input
            type="email"
            id="in_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="in_password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button onClick={handleSignin}>Sign In</button>
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
