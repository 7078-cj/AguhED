import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCog, FaSignOutAlt, FaHome, FaDesktop, FaQuestionCircle, FaComments, FaGlobe } from "react-icons/fa";
import styles from "../css/Navbar2.module.css";
import Logo from "../assets/logo.svg";
import { FeedbackModal, HelpSupportModal, LanguageModal } from "./Modals";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
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
        <Link
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
        </Link>
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
              <Link to="/profile" className={styles.dropdownItem}>
                <FaUser /> Profile
              </Link>
              <Link to="/settings" className={styles.dropdownItem}>
                <FaCog /> Settings
              </Link>
              <div className={styles.dropdownDivider} />
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setShowHelpModal(true);
                  setShowDropdown(false);
                }}
              >
                <FaQuestionCircle /> Help & Support
              </button>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setShowFeedbackModal(true);
                  setShowDropdown(false);
                }}
              >
                <FaComments /> Give Feedback
              </button>
              <div className={styles.dropdownDivider} />
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setShowLanguageModal(true);
                  setShowDropdown(false);
                }}
              >
                <FaGlobe /> Language
              </button>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
      <HelpSupportModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </nav>
  );
};

export default Navbar;
