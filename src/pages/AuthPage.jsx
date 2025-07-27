import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/AuthPage.module.css";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
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
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Decorative elements */}
        <div className={`${styles.decorativeCircle} ${styles.decorativeTopRight}`}></div>
        <div className={`${styles.decorativeCircle} ${styles.decorativeBottomLeft}`}></div>

        <div className={styles.formContent}>
          <h2 className={styles.authTitle}>
            <span style={{ 
              color: isRegistering ? "var(--color-primary-accent)" : "var(--color-secondary-accent)", 
              position: "relative"
            }}>
              {isRegistering ? "Create Account" : "Welcome Back"}
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" style={{
                position: "absolute",
                bottom: "-3px",
                left: "0",
                right: "0",
              }}>
                <path d="M0 1.5H100" stroke={isRegistering ? "var(--color-primary-accent)" : "var(--color-secondary-accent)"} strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email:</label>
              <input
                className={styles.formInput}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password:</label>
              <input
                className={styles.formInput}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              className={styles.submitButton}
              type="submit"
            >
              {isRegistering ? "Sign Up" : "Log In"} →
            </button>
          </form>
          
          <div className={styles.toggleText}>
            {isRegistering ? "Already have an account?" : "Need an account?"}
          </div>
          
          <button 
            className={styles.toggleButton}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Sign In Instead" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}