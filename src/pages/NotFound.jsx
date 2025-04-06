import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";

export default function NotFound() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);

  return (
    <div 
      className="w-100 py-5 d-flex justify-content-center align-items-center page-transition"
      style={{
        ...styles.pageContainer,
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <div className="container">
        <div 
          className="text-center p-5 position-relative mx-auto"
          style={{
            ...styles.purpleCard,
            maxWidth: "700px"
          }}
        >
          {/* Decorative elements */}
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              top: "15px", 
              right: "15px", 
              width: "60px", 
              height: "60px", 
              background: currentTheme.colors.secondaryAccent,
              opacity: "0.5",
              zIndex: 1 
            }}
          ></div>
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              bottom: "15px", 
              left: "15px", 
              width: "40px", 
              height: "40px", 
              background: currentTheme.colors.primaryAccent,
              opacity: "0.4",
              zIndex: 1 
            }}
          ></div>

          <div className="position-relative" style={{ zIndex: 2 }}>
            <h1 className="display-1 fw-bold mb-3">404</h1>
            <h2 className="fw-bold mb-4">
              <span style={{ 
                color: currentTheme.colors.secondaryAccent, 
                position: "relative"
              }}>
                Page not found
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" style={{
                  position: "absolute",
                  bottom: "-3px",
                  left: "0",
                  right: "0",
                }}>
                  <path d="M0 1.5H100" stroke={currentTheme.colors.secondaryAccent} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link
              to="/"
              className="btn btn-lg fw-bold px-4 py-2 mt-3"
              style={styles.primaryButton}
              onMouseOver={commonStyles.buttonHoverEffect}
              onMouseOut={commonStyles.buttonLeaveEffect}
            >
              Go Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}