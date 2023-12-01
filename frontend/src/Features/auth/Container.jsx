import React from "react";
import "./style.css";
import { useState } from "react";
import { UserC } from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loader/Loader";

const Container = () => {
  const navigate = useNavigate();
  const { setusername, setrole } = UserC();
  const [formdata, setformdata] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Set loading to true when starting the request
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/users/login`,
        formdata
      );
      localStorage.setItem("userT", JSON.stringify(response.data.data));
      setrole(response.data.user.role);
      setusername(response.data.user.userName);
      navigate("/");
    } catch (error) {
      // Handle error if the request fails
      console.error("Error submitting form:", error);
    } finally {
      // Set loading back to false when the request is complete (success or failure)
      setLoading(false);
    }
  };
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-page-container">
      <form onSubmit={handlesubmit}>
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
          <input
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={handlechange}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={handlechange}
          />
          <button defaultValue="Login" className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Container;
