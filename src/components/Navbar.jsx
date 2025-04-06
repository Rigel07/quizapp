import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/ThemeStyles";

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
                style={{
                  color: currentTheme.colors.text,
                  fontSize: "1.1rem",
                  position: "relative",
                  padding: "8px 16px",
                }}
                onMouseOver={(e) => {
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
                }}
                onMouseOut={(e) => {
                  const underline = e.currentTarget.querySelector(".nav-underline");
                  if (underline) {
                    e.currentTarget.removeChild(underline);
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link fw-bold"
                to="/create-quiz"
                style={{
                  color: currentTheme.colors.text,
                  fontSize: "1.1rem",
                  position: "relative",
                  padding: "8px 16px",
                }}
                onMouseOver={(e) => {
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
                }}
                onMouseOut={(e) => {
                  const underline = e.currentTarget.querySelector(".nav-underline");
                  if (underline) {
                    e.currentTarget.removeChild(underline);
                  }
                }}
              >
                Create Quiz
              </Link>
            </li>
            {user && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link fw-bold"
                  to="/dashboard"
                  style={{
                    color: currentTheme.colors.text,
                    fontSize: "1.1rem",
                    position: "relative",
                    padding: "8px 16px",
                  }}
                  onMouseOver={(e) => {
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
                  }}
                  onMouseOut={(e) => {
                    const underline = e.currentTarget.querySelector(".nav-underline");
                    if (underline) {
                      e.currentTarget.removeChild(underline);
                    }
                  }}
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
              border: "3px solid #000",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
              boxShadow: "2px 2px 0px #000",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translate(-1px, -1px)";
              e.currentTarget.style.boxShadow = "3px 3px 0px #000";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #000";
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}