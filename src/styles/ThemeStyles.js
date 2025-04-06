// ThemeStyles.js

// Light Theme
export const lightTheme = {
  colors: {
    background: "#F7F2FF",     // Pastel lavender background
    primaryAccent: "#FFD44F",  // Yellow for main CTAs
    secondaryAccent: "#FA74B6",// Pink accent for hovers, etc.
    cardBackground: "#FFFFFF", // White cards
    text: "#1F1F1F",           // Near-black text
  },
  gradients: {
    hero: "none",
  },
  button: {
    primary: {
      background: "#FFD44F",
      color: "#000000",
      border: "3px solid #000000",
    },
    outline: {
      border: "3px solid #000000",
      color: "#000000",
      background: "transparent",
    },
  },
  shadows: {
    card: "4px 4px 0px #000000",
  },
};

// Dark Theme
export const darkTheme = {
  colors: {
    background: "#2A1E3C",      // A dark purple
    primaryAccent: "#FFD44F",   // Same yellow
    secondaryAccent: "#FA74B6", // Pink accent
    cardBackground: "#3A2C50",  // Slightly lighter purple for cards
    text: "#FFFFFF",
  },
  gradients: {
    hero: "none",
  },
  button: {
    primary: {
      background: "#FFD44F",
      color: "#000000",
      border: "3px solid #000000",
    },
    outline: {
      border: "3px solid #FFD44F",
      color: "#FFD44F",
      background: "transparent",
    },
  },
  shadows: {
    card: "4px 4px 0px #000000",
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
