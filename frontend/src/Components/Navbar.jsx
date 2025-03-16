import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [sOpen, setOpened] = React.useState(false);
  const [menuOptions] = React.useState([
    { icon: "home", name: "Home" },
    { icon: "chat", name: "Messages" },
    { icon: "gear", name: "Settings" },
  ]);
  
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar-links-container">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
      </div>
      <div className="navbar-links-container2">
        
          <a href="/login">Login</a>
          <a href="/register">Sign up</a>
         
      </div>
       <div className="navbar-menu-container">
        <GiHamburgerMenu onClick={() => setOpened(true)} />
      </div> 
    </nav>
  );
};

export default Navbar;
