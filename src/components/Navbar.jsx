import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { themes, commonStyles } from "../styles/ThemeStyles";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const currentTheme = themes[theme];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  // Common nav link style
  const navLinkStyle = {
    color: currentTheme.colors.text,
    fontSize: "1.1rem",
    position: "relative",
    padding: "8px 16px",
  };

  const addNavUnderline = (e) => {
    const underline = document.createElement("div");
    underline.style.position = "absolute";
    underline.style.bottom = "0";
    underline.style.left = "0";
    underline.style.width = "100%";
    underline.style.height = "3px";
    underline.style.background = currentTheme.colors.secondaryAccent;
    underline.style.borderRadius = "3px";
    underline.className = "nav-underline";
    e.currentTarget.appendChild(underline);
  };

  const removeNavUnderline = (e) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline) {
      e.currentTarget.removeChild(underline);
    }
  };

  return (
    <nav
      style={{
        background: currentTheme.colors.background,
        borderBottom: "4px solid #000",
        padding: "15px 0",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left: Brand */}
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand"
            to="/"
            style={{ 
              fontFamily: "'Coda', cursive", 
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: currentTheme.colors.text,
              marginRight: "20px"
            }}
          >
            Quiz App
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="d-none d-lg-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mx-2">
              <Link
                className="nav-link fw-bold"
                to="/"
                style={navLinkStyle}
                onMouseOver={addNavUnderline}
                onMouseOut={removeNavUnderline}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link fw-bold"
                to="/create-quiz"
                style={navLinkStyle}
                onMouseOver={addNavUnderline}
                onMouseOut={removeNavUnderline}
              >
                Create Quiz
              </Link>
            </li>
            {user && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link fw-bold"
                  to="/dashboard"
                  style={navLinkStyle}
                  onMouseOver={addNavUnderline}
                  onMouseOut={removeNavUnderline}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right: Logout & Theme Toggle */}
        <div className="d-flex align-items-center">
          {user ? (
            <button
              className="btn fw-bold me-3"
              onClick={handleLogout}
              style={{
                color: currentTheme.colors.text,
                background: "transparent",
                border: "none",
                fontSize: "1.1rem",
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              className="btn fw-bold me-3"
              to="/auth"
              style={{
                color: currentTheme.colors.text,
                background: "transparent",
                border: "none",
                fontSize: "1.1rem",
              }}
            >
              Login
            </Link>
          )}
          <button
            className="btn ms-2"
            onClick={toggleTheme}
            style={{
              color: theme === "light" ? "#FFFFFF" : "#2A1E3C",
              border: currentTheme.borders.input,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
              boxShadow: currentTheme.shadows.smallButton,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={commonStyles.smallButtonHoverEffect}
            onMouseOut={commonStyles.smallButtonLeaveEffect}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}