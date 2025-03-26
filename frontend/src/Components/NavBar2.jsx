import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCog, FaSignOutAlt, FaHome, FaDesktop, FaQuestionCircle, FaComments, FaGlobe } from "react-icons/fa";
import styles from "../css/Navbar2.module.css";
import Logo from "../assets/logo.svg";
import { FeedbackModal, HelpSupportModal, LanguageModal } from "./Modals";
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  let { logOut } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <nav className={`${styles.navbar}`}>
      <div className={styles.leftSection}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        
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
             
             
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={()=>{logOut()}}>
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
