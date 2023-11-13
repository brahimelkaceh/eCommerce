import React from "react";
// import "./style.css";
import { useState } from "react";
const LoginAdmin = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setSignUpActive(true);
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
  };
  return (
    <div className={isSignUpActive ? "right-panel-active" : "login-container"}>
      <div className="login-form-container sign-up-container">
        <form action="">
          <h1>Create Account</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="file" name="avatar" /> <br />
          <br />
          <button onClick={handleSignUpClick}>Sign Up</button>
        </form>
      </div>
      <div className="login-from-container sign-in-container">
        <form>
          <h1>Sign in</h1>

          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button onClick={handleSignInClick}>Sign In</button>
        </form>
      </div>
      <div class="login-overlay-container">
        <div class="login-overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
