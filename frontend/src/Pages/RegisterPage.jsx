import React, { useState } from "react";
import "../css/register.css";
import Logo from "../assets/logo.svg";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <a href="/">
            <img src={Logo} alt="AguhEd Logo" className="signup-logo" />
          </a>
          <h2>Welcome to AguhEd</h2>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <hr></hr>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="signup-button" />
          </div>
        </form>
        <div className="already-have-account">
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
