// ThemeStyles.js

// Light Theme
export const lightTheme = {
  colors: {
    background: "#F7F2FF",     // Pastel lavender background
    primaryAccent: "#FFD44F",  // Yellow for main CTAs
    secondaryAccent: "#FA74B6",// Pink accent for hovers, etc.
    cardBackground: "#FFFFFF", // White cards
    text: "#1F1F1F",           // Near-black text
    purpleBackground: "#F0E6FF", // Purple background for cards
    pinkBackground: "#FFE6F7",  // Pink background for cards
    yellowBackground: "#FFF6D6", // Yellow background for cards
    errorBackground: "#FFE6E6",  // Error background
    inputBackground: "#FFFFFF",  // Input background
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
    secondary: {
      background: "#F0E6FF", 
      color: "#1F1F1F",
      border: "3px solid #000000",
    },
    danger: {
      background: "#FFE6E6", 
      color: "#1F1F1F",
      border: "2px solid #000000",
    },
    outline: {
      border: "3px solid #000000",
      color: "#000000",
      background: "transparent",
    },
  },
  shadows: {
    card: "4px 4px 0px #000000",
    button: "3px 3px 0px #000000",
    buttonHover: "5px 5px 0px #000000",
    smallButton: "2px 2px 0px #000000",
  },
  borders: {
    standard: "4px solid #000",
    input: "3px solid #000",
    thin: "2px solid #000",
  },
  borderRadius: {
    card: "20px",
    largeCard: "24px",
    input: "12px",
    button: "30px",
    smallButton: "20px",
  },
  components: {
    pageContainer: {
      padding: "40px 0",
      minHeight: "calc(100vh - 136px)",
    },
    card: {
      border: "4px solid #000",
      borderRadius: "20px",
      padding: "25px 20px",
      boxShadow: "4px 4px 0px #000000",
      position: "relative",
      overflow: "hidden",
    },
    input: {
      border: "3px solid #000",
      borderRadius: "12px",
      padding: "10px 15px",
    },
    decorativeCircle: {
      borderRadius: "50%",
      position: "absolute",
      zIndex: 1,
    },
    questionCounter: {
      width: "28px",
      height: "28px",
      lineHeight: "28px",
      borderRadius: "50%",
      fontWeight: "bold",
      border: "2px solid #000",
      textAlign: "center",
      display: "inline-block",
      marginRight: "10px",
    }
  }
};

// Dark Theme
export const darkTheme = {
  colors: {
    background: "#2A1E3C",      // A dark purple
    primaryAccent: "#FFD44F",   // Same yellow
    secondaryAccent: "#FA74B6", // Pink accent
    cardBackground: "#3A2C50",  // Slightly lighter purple for cards
    text: "#FFFFFF",
    purpleBackground: "#3D305A", // Purple background for cards
    pinkBackground: "#4D2A50",   // Pink background for cards
    yellowBackground: "#4D4430", // Yellow background for cards
    errorBackground: "#4D2A2A",  // Error background
    inputBackground: "#3A2C50",  // Input background
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
    secondary: {
      background: "#3D305A", 
      color: "#FFFFFF",
      border: "3px solid #000000",
    },
    danger: {
      background: "#5A3030", 
      color: "#FFFFFF",
      border: "2px solid #000000",
    },
    outline: {
      border: "3px solid #FFD44F",
      color: "#FFD44F",
      background: "transparent",
    },
  },
  shadows: {
    card: "4px 4px 0px #000000",
    button: "3px 3px 0px #000000",
    buttonHover: "5px 5px 0px #000000",
    smallButton: "2px 2px 0px #000000",
  },
  borders: {
    standard: "4px solid #000",
    input: "3px solid #000",
    thin: "2px solid #000",
  },
  borderRadius: {
    card: "20px",
    largeCard: "24px",
    input: "12px",
    button: "30px",
    smallButton: "20px",
  },
  components: {
    pageContainer: {
      padding: "40px 0",
      minHeight: "calc(100vh - 136px)",
    },
    card: {
      border: "4px solid #000",
      borderRadius: "20px",
      padding: "25px 20px",
      boxShadow: "4px 4px 0px #000000",
      position: "relative",
      overflow: "hidden",
    },
    input: {
      border: "3px solid #000",
      borderRadius: "12px",
      padding: "10px 15px",
    },
    decorativeCircle: {
      borderRadius: "50%",
      position: "absolute",
      zIndex: 1,
    },
    questionCounter: {
      width: "28px",
      height: "28px",
      lineHeight: "28px",
      borderRadius: "50%",
      fontWeight: "bold",
      border: "2px solid #000",
      textAlign: "center",
      display: "inline-block",
      marginRight: "10px",
    }
  }
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// Shared styles that can be used across components
export const commonStyles = {
  // Button hover/leave handlers
  buttonHoverEffect: (e) => {
    e.currentTarget.style.transform = "translate(-2px, -2px)";
    e.currentTarget.style.boxShadow = "5px 5px 0px #000000";
  },
  
  buttonLeaveEffect: (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
  },
  
  // Small button hover/leave handlers
  smallButtonHoverEffect: (e) => {
    e.currentTarget.style.transform = "translate(-1px, -1px)";
    e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
  },
  
  smallButtonLeaveEffect: (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
  },
  
  // Card hover/leave handlers
  cardHoverEffect: (e) => {
    e.currentTarget.style.transform = "translate(-3px, -3px)";
    e.currentTarget.style.boxShadow = "7px 7px 0px #000000";
  },
  
  cardLeaveEffect: (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = "4px 4px 0px #000000";
  }
};

// Helper function to get styles based on theme
export function getComponentStyles(themeMode) {
  const currentTheme = themes[themeMode];
  
  return {
    pageContainer: {
      background: currentTheme.colors.background,
      color: currentTheme.colors.text,
      minHeight: "calc(100vh - 136px)",
    },
    
    headerCard: {
      border: currentTheme.borders.standard,
      borderRadius: currentTheme.borderRadius.largeCard,
      background: themeMode === "light" ? "#F7F2FF" : "#2A1E3C",
      boxShadow: currentTheme.shadows.card,
      overflow: "hidden",
      position: "relative",
      padding: "25px 20px",
    },
    
    purpleCard: {
      border: currentTheme.borders.standard,
      borderRadius: currentTheme.borderRadius.card,
      background: currentTheme.colors.purpleBackground,
      boxShadow: currentTheme.shadows.card,
      overflow: "hidden",
      position: "relative",
      padding: "25px 20px",
    },
    
    pinkCard: {
      border: currentTheme.borders.standard,
      borderRadius: currentTheme.borderRadius.card,
      background: currentTheme.colors.pinkBackground,
      boxShadow: currentTheme.shadows.card,
      overflow: "hidden",
      position: "relative",
      padding: "25px 20px",
    },
    
    yellowCard: {
      border: currentTheme.borders.standard,
      borderRadius: currentTheme.borderRadius.card,
      background: currentTheme.colors.yellowBackground,
      boxShadow: currentTheme.shadows.card,
      overflow: "hidden",
      position: "relative",
      padding: "25px 20px",
    },
    
    primaryButton: {
      background: currentTheme.button.primary.background,
      color: currentTheme.button.primary.color,
      border: currentTheme.button.primary.border,
      borderRadius: currentTheme.borderRadius.button,
      boxShadow: currentTheme.shadows.button,
      transition: "transform 0.2s, box-shadow 0.2s",
      fontWeight: "bold",
    },
    
    secondaryButton: {
      background: currentTheme.button.secondary.background,
      color: currentTheme.button.secondary.color,
      border: currentTheme.button.secondary.border,
      borderRadius: currentTheme.borderRadius.button,
      boxShadow: currentTheme.shadows.button,
      transition: "transform 0.2s, box-shadow 0.2s",
      fontWeight: "bold",
    },
    
    dangerButton: {
      background: currentTheme.button.danger.background,
      color: currentTheme.button.danger.color,
      border: currentTheme.button.danger.border,
      borderRadius: currentTheme.borderRadius.smallButton,
      boxShadow: currentTheme.shadows.smallButton,
      transition: "transform 0.2s, box-shadow 0.2s",
      fontWeight: "bold",
    },
    
    input: {
      border: currentTheme.borders.input,
      borderRadius: currentTheme.borderRadius.input,
      padding: "10px 15px",
      backgroundColor: currentTheme.colors.inputBackground,
      color: currentTheme.colors.text,
    },
    
    questionCounter: {
      background: currentTheme.colors.primaryAccent,
      color: "#000",
      ...currentTheme.components.questionCounter
    }
  };
}
