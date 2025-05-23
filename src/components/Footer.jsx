import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/ThemeStyles";

export default function Footer() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <footer
      className="py-4"
      style={{
        background: currentTheme.colors.background,
        borderTop: "4px solid #000",
        color: currentTheme.colors.text,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container text-center">
        <div 
          style={{ 
            display: "inline-block",
            padding: "8px 25px",
            borderRadius: "30px",
            background: theme === "light" ? currentTheme.colors.purpleBackground : currentTheme.colors.purpleBackground,
            border: currentTheme.borders.standard,
            boxShadow: currentTheme.shadows.smallButton,
            fontWeight: "bold",
          }}
        >
          © {new Date().getFullYear()} Quiz App. PC06
        </div>
      </div>
    </footer>
  );
}