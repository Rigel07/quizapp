import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";
import { getAllQuizzes } from "../models/quizModel";

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesData = await getAllQuizzes();
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div 
      className="w-100 py-5 page-transition"
      style={styles.pageContainer}
    >
      <div className="container">
        {/* Hero Section */}
        <section
          className="text-center p-5 mb-5 position-relative"
          style={styles.headerCard}
        >
          {/* Decorative elements */}
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              top: "20px", 
              right: "20px", 
              width: "60px", 
              height: "60px", 
              background: currentTheme.colors.primaryAccent,
            }}
          ></div>
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              bottom: "20px", 
              left: "20px", 
              width: "40px", 
              height: "40px", 
              background: currentTheme.colors.secondaryAccent,
            }}
          ></div>

          <div className="position-relative" style={{ zIndex: 2 }}>
            <h1 className="display-3 fw-bold mb-3">
              The best place to 
              <span style={{ 
                color: currentTheme.colors.secondaryAccent, 
                fontStyle: "italic",
                display: "inline",
                marginLeft: "10px",
                position: "relative",
              }}>
                learn
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "0",
                  right: "0",
                }}>
                  <path d="M0 4C25 0 75 8 100 4" stroke={currentTheme.colors.secondaryAccent} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <span style={{ 
                marginLeft: "10px", 
                marginRight: "10px" 
              }}>
                and
              </span>
              <span style={{ 
                color: currentTheme.colors.primaryAccent, 
                display: "inline",
                position: "relative",
              }}>
                play
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" style={{
                  position: "absolute",
                  bottom: "-3px",
                  left: "0",
                  right: "0",
                }}>
                  <path d="M0 1.5H100" stroke={currentTheme.colors.primaryAccent} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="lead mb-4 fw-semibold">
              Fun, exciting quizzes to test your brain power!
            </p>
            
            <div className="d-flex justify-content-center">
              <Link
                to="/create-quiz"
                className="btn btn-lg fw-bold px-4 py-2 page-transition"
                style={styles.primaryButton}
                onMouseOver={commonStyles.buttonHoverEffect}
                onMouseOut={commonStyles.buttonLeaveEffect}
              >
                ✨ Create Quiz
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-5">
          <h2 className="text-center fw-bold mb-4">
            Our 
            <span style={{ 
              color: currentTheme.colors.secondaryAccent, 
              fontStyle: "italic",
              marginLeft: "8px",
            }}>
              interactive&nbsp;
            </span> 
            features
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div style={{
                ...styles.purpleCard,
                height: "100%",
              }}>
                <div className="position-absolute" style={{
                  ...currentTheme.components.decorativeCircle,
                  top: "15px",
                  right: "15px",
                  width: "50px",
                  height: "50px",
                  background: "#C2A9FA",
                  opacity: "0.5",
                }}></div>
                
                <div className="position-relative" style={{ zIndex: "2" }}>
                  <h3 className="fw-bold">Fun Quiz</h3>
                  <p>Test your knowledge with a short but exciting quizzes!</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div style={{
                ...styles.pinkCard,
                height: "100%",
              }}>
                <div className="position-absolute" style={{
                  ...currentTheme.components.decorativeCircle,
                  bottom: "15px",
                  right: "15px",
                  width: "70px",
                  height: "70px",
                  background: "#FA74B6",
                  opacity: "0.4",
                }}></div>
                
                <div className="position-relative" style={{ zIndex: "2" }}>
                  <h3 className="fw-bold">Creative Activities</h3>
                  <p>Discover enjoyable activities such as coding, crafting, and science.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div style={{
                ...styles.yellowCard,
                height: "100%",
              }}>
                <div className="position-absolute" style={{
                  ...currentTheme.components.decorativeCircle,
                  bottom: "45px",
                  left: "15px",
                  width: "40px",
                  height: "40px",
                  background: "#FFD44F",
                  opacity: "0.5",
                }}></div>
                
                <div className="position-relative" style={{ zIndex: "2" }}>
                  <h3 className="fw-bold">Learn with Games</h3>
                  <p>Learn something new while having fun playing games!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section>
          <h2 className="mb-4 fw-bold text-center">Explore Quizzes</h2>

          {loading ? (
            <p className="text-center">Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <p className="text-center">No quizzes found. Be the first to create one!</p>
          ) : (
            <div className="row g-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="col-md-4">
                  <div
                    className="card h-100 page-transition"
                    style={{
                      background: theme === "light" ? "#FFFFFF" : "#3A2C50",
                      color: currentTheme.colors.text,
                      borderRadius: "16px",
                      border: currentTheme.borders.standard,
                      boxShadow: currentTheme.shadows.card,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onMouseOver={commonStyles.cardHoverEffect}
                    onMouseOut={commonStyles.cardLeaveEffect}
                  >
                    {/* Decorative element */}
                    <div 
                      className="position-absolute" 
                      style={{ 
                        ...currentTheme.components.decorativeCircle,
                        top: "-10px", 
                        right: "-10px", 
                        width: "50px", 
                        height: "50px",
                        background: "#FFD44F",
                        opacity: "0.3",
                      }}
                    ></div>
                    
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{quiz.title}</h5>
                      <p className="card-text flex-grow-1">
                        {quiz.description || <em>No description available</em>}
                      </p>
                      <div className="text-end">
                        <Link
                          to={`/quiz/${quiz.id}`}
                          className="btn fw-semibold page-transition"
                          style={{
                            ...styles.primaryButton,
                            padding: "8px 20px",
                            boxShadow: currentTheme.shadows.smallButton,
                          }}
                          onMouseOver={commonStyles.smallButtonHoverEffect}
                          onMouseOut={commonStyles.smallButtonLeaveEffect}
                        >
                          Take Quiz →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}