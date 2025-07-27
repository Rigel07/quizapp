import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Quiz App. <a href="https://github.com/Rigel07" target="_blank" rel="noopener noreferrer">
            GitHub: Rigel07
            </a>
        </div>
      </div>
    </footer>
  );
}