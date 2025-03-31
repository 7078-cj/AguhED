import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCog, FaSignOutAlt, FaHome, FaDesktop, FaQuestionCircle, FaComments, FaGlobe } from "react-icons/fa";
import styles from "../css/Navbar2.module.css";
import Logo from "../../src/assets/Logo.png";

import AuthContext from "../Context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  let { logOut } = useContext(AuthContext);


  return (
    <nav className={`${styles.navbar}`}>
      <div className={styles.leftSection}>
        {/* <img src={Logo} alt="Logo" className={styles.logo} /> */}
        <p className={styles.logo} > AguhEd</p>

{/* <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div> */}
      </div>

      <div className={styles.centerSection}>
        <Link
          to="/home"
          className={`${styles.navLink} ${
            location.pathname === "/home" ? styles.active : ""
          }`}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaHome /> Home
          </motion.span>
        </Link>
        {/* <Link
          to="/present"
          className={`${styles.navLink} ${
            location.pathname === "/present" ? styles.active : ""
          }`}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaDesktop /> Presentation
          </motion.span>
        </Link> */}
      </div>

      <div className={styles.rightSection}>
        <div
          className={styles.userMenu}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className={styles.userAvatar}>
            <FaUser />
          </div>
          {showDropdown && (
            <div className={styles.dropdown}>
              {/* <Link to="/profile" className={styles.dropdownItem}>
                <FaUser /> Profile
              </Link>
              <Link to="/settings" className={styles.dropdownItem}>
                <FaCog /> Settings
              </Link>
              <div className={styles.dropdownDivider} />
              <Link to="/help" className={styles.dropdownItem}>
                <FaQuestionCircle /> Help & Support
              </Link>
              <Link to="/help#feedback" className={styles.dropdownItem}>
                <FaComments /> Give Feedback
              </Link>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem}>
                <FaGlobe /> Language
              </button> */}
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={()=>{logOut()}}>
                <FaSignOutAlt /> Logout
              </button>
            </div>


          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
