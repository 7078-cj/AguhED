import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "../css/login.css";
import LandingPage from "../pages/LandingPage";
import Logo from "../assets/logo.svg";

function Login() {
  let { loginUser } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <a href="/">
            <img src={Logo} alt="AguhEd Logo" className="login-logo" />
          </a>
          <h2>Welcome to AguhEd</h2>
        </div>
        <form onSubmit={loginUser} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
            />
          </div>
          <hr></hr>

          <div className="form-group">
            <input type="submit" value="Log In" className="login-button" />
          </div>
        </form>
        <div className="create-account">
          <a href="/register">Create New Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
