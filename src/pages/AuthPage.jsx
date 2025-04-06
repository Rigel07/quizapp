import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center page-transition"
      style={styles.pageContainer}
    >
      <div 
        className="p-4 position-relative"
        style={{
          width: "450px",
          ...styles.purpleCard
        }}
      >
        {/* Decorative elements */}
        <div 
          className="position-absolute" 
          style={{ 
            ...currentTheme.components.decorativeCircle,
            top: "15px", 
            right: "15px", 
            width: "50px", 
            height: "50px", 
            background: currentTheme.colors.primaryAccent,
            opacity: "0.5",
          }}
        ></div>
        <div 
          className="position-absolute" 
          style={{ 
            ...currentTheme.components.decorativeCircle,
            bottom: "20px", 
            left: "20px", 
            width: "35px", 
            height: "35px", 
            background: currentTheme.colors.secondaryAccent,
            opacity: "0.4",
          }}
        ></div>

        <div className="position-relative" style={{ zIndex: 2 }}>
          <h2 className="text-center fw-bold mb-3">
            <span style={{ 
              color: isRegistering ? currentTheme.colors.primaryAccent : currentTheme.colors.secondaryAccent, 
              position: "relative"
            }}>
              {isRegistering ? "Create Account" : "Welcome Back"}
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" style={{
                position: "absolute",
                bottom: "-3px",
                left: "0",
                right: "0",
              }}>
                <path d="M0 1.5H100" stroke={isRegistering ? currentTheme.colors.primaryAccent : currentTheme.colors.secondaryAccent} strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          {error && (
            <div 
              className="alert py-2" 
              style={{
                background: currentTheme.colors.errorBackground,
                border: "2px solid #FF7878",
                borderRadius: "8px",
                color: theme === "light" ? "#D80000" : "#FF9A9A",
              }}
            >
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email:</label>
              <input
                className="form-control"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Password:</label>
              <input
                className="form-control"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button 
              className="btn fw-bold w-100 mb-3 page-transition"
              type="submit"
              style={styles.primaryButton}
              onMouseOver={commonStyles.buttonHoverEffect}
              onMouseOut={commonStyles.buttonLeaveEffect}
            >
              {isRegistering ? "Sign Up" : "Log In"} →
            </button>
          </form>
          <button 
            className="btn w-100 fw-semibold page-transition"
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              background: "transparent",
              color: currentTheme.button.outline.color,
              border: currentTheme.button.outline.border,
              borderRadius: currentTheme.borderRadius.button,
              boxShadow: currentTheme.shadows.smallButton,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={commonStyles.smallButtonHoverEffect}
            onMouseOut={commonStyles.smallButtonLeaveEffect}
          >
            {isRegistering ? "Already have an account?" : "Need an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}