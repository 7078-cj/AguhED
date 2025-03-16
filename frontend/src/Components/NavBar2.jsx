import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaChalkboard, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Folder from "../assets/folder.png";

import "../css/navbar2.css";

const Navbar = () => {
  const [sOpen, setOpened] = React.useState(false);
  const [menuOptions] = React.useState([
    { icon: "home", name: "Home" },
    { icon: "chat", name: "Messages" },
    { icon: "gear", name: "Settings" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar-links-container">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>

          <input
            id="query"
            className="input"
            type="search"
            placeholder="Find a file..."
            name="searchbar"
          />
        </div>
        <Link
          to="/home"
          className={`navbar-link ${
            location.pathname === "/home" ? "active" : ""
          }`}
        >
          <FaHome className="icon" />
          Home
        </Link>
        <Link
          to="/present"
          className={`navbar-link ${
            location.pathname === "/present" ? "active" : ""
          }`}
        >
          <FaChalkboard className="icon" />
          Presentation
        </Link>
      </div>
      <div className="navbar-icons">
        <div className="icon-container">
          <FaPlus className="icon plus-icon" onClick={openModal} />
        </div>
        <div className="icon-container">
          <FaBars className="icon menu-icon" />
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="file-upload-container">
              <div className="upload-outer-box">
                <div className="upload-box">
                  <div className="upload-illustration">
                    {/* Add your folder illustration image */}
                    <img
                      src={Folder}
                      alt="Folder"
                      className="illustration-icon"
                    />
                  </div>
                  <p className="upload-text">
                    <span className="browse-text">Browse file</span> on your
                    computer
                  </p>
                  <p className="file-type">PDF only</p>
                </div>
                <button className="upload-button">Choose a File</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <GiHamburgerMenu onClick={() => setOpened(true)} />
    </nav>
  );
};

export default Navbar;
