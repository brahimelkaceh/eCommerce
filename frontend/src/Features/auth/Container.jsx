import React from "react";
import "./style.css";
import { useState } from "react";
import { UserC } from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const navigate = useNavigate();
  const { setusername, setrole } = UserC();
  const [formdata, setformdata] = useState(null);
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    axios
      .post(`http://localhost:5000/users/login`, formdata)
      .then((response) => {
        console.log(response.data.user);
        localStorage.setItem("userT", JSON.stringify(response.data.data));
        setrole(response.data.user.role);
        setusername(response.data.user.userName);
        navigate("/");
      });
  };
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handlesubmit} className="form">
      <p className="title">Register </p>
      <p className="message">Signup now and get full access to our app. </p>

      <label>
        <input
          onChange={handlechange}
          required
          placeholder
          name="email"
          type="email"
          className="input"
        />
        <span>Email</span>
      </label>
      <label>
        <input
          onChange={handlechange}
          required
          placeholder
          name="password"
          type="password"
          className="input"
        />
        <span>Password</span>
      </label>

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default Container;
