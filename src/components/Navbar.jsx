import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.container} container`}>
        {/* Left: Brand */}
        <div className="d-flex align-items-center">
          <Link
            className={styles.brand}
            to="/"
            onClick={closeMobileMenu}
          >
            Quiz App
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <button 
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen1 : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen2 : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen3 : ''}`}></span>
        </button>

        {/* Desktop: Center Navigation Links */}
        <div className={styles.navCenter}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                to="/create-quiz"
              >
                Create Quiz
              </Link>
            </li>
            {user && (
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop: Right Section */}
        <div className={styles.rightSection}>
          {user ? (
            <button
              className={styles.authButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              className={styles.authButton}
              to="/auth"
            >
              Login
            </Link>
          )}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <Link
                className={styles.mobileNavLink}
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link
                className={styles.mobileNavLink}
                to="/create-quiz"
                onClick={closeMobileMenu}
              >
                Create Quiz
              </Link>
            </li>
            {user && (
              <li className={styles.mobileNavItem}>
                <Link
                  className={styles.mobileNavLink}
                  to="/dashboard"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className={styles.mobileNavItem}>
              {user ? (
                <button
                  className={styles.mobileAuthButton}
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className={styles.mobileAuthButton}
                  to="/auth"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </li>
            <li className={styles.mobileNavItem}>
              <button
                className={styles.mobileThemeToggle}
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}