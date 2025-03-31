import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} px-3`}>
      <Link className="navbar-brand" to="/">Quiz App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={`nav-link text-${theme === "light" ? "dark" : "light"}`} to="/">Home</Link>
          </li>
          {user && <Link className={`nav-link text-${theme === "light" ? "dark" : "light"}`} to="/create-quiz">Create Quiz</Link>}
          {user ? (
            <li className="nav-item">
              <button className={`nav-link btn btn-link text-${theme === "light" ? "dark" : "light"}`} onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className={`nav-link btn btn-link text-${theme === "light" ? "dark" : "light"}`} to="/auth">Login</Link>
            </li>
          )}
          <li className="nav-item">
            <button className={`btn ms-2 bg-${theme === "light" ? "dark" : "light"} text-${theme === "light" ? "light" : "dark"}`} onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
