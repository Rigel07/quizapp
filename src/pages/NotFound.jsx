import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className="container">
        <div className={styles.notFoundCard}>
          {/* Decorative elements */}
          <div className={`${styles.decorativeCircle} ${styles.decorativeTopRight}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.decorativeBottomLeft}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.decorativeCenter}`}></div>

          <div className={styles.cardContent}>
            <div className={styles.errorNumber}>404</div>
            <h2 className={styles.errorTitle}>
              <span className={styles.errorTitleAccent}>
                Page not found
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" className={styles.titleUnderline}>
                  <path d="M0 1.5H100" stroke="var(--color-secondary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className={styles.errorMessage}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link to="/" className={styles.homeButton}>
              🏠 Go Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}