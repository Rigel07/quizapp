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
            background: theme === "light" ? "#F0E6FF" : "#3D305A",
            border: "3px solid #000",
            boxShadow: "2px 2px 0px #000",
            fontWeight: "bold",
          }}
        >
          © {new Date().getFullYear()} Quiz App. PC06
        </div>
      </div>
    </footer>
  );
}