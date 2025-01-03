import React, { useState, useEffect } from "react";
import styles from "./css/Navbar.module.css";
import { toast } from "react-toastify";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
    toast.info(`Switched to ${!isDarkMode ? "Dark" : "Light"} Mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.reload(); // Redirect to the login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>Form Dashboard</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.darkModeToggle} onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className={styles.dropdown}>
          <button className={styles.dropdownToggle}>Settings</button>
          <div className={styles.dropdownMenu}>
            <button onClick={() => toast.info("Feature coming soon!")}>
              Profile Settings
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
