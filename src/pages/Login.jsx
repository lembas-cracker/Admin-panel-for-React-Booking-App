import React, { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(API_BASE_URL + "/auth/login", credentials, { withCredentials: true });
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" } });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleClick} className="login-container">
        <input type="text" className="login-input" id="username" placeholder="Username" onChange={handleChange} />
        <input type="password" className="login-input" id="password" placeholder="Password" onChange={handleChange} />
        <button disabled={loading} className="login-button" type="submit">
          Log In
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
