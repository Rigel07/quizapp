import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/ThemeStyles";
import { getAllQuizzes } from "../models/quizModel";

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
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
      style={{
        background: currentTheme.colors.background,
        color: currentTheme.colors.text,
        minHeight: "calc(100vh - 136px)", // Account for navbar and footer heights
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <section
          className="text-center p-5 mb-5 position-relative"
          style={{
            border: "4px solid #000",
            borderRadius: "24px",
            background: theme === "light" ? "#F7F2FF" : "#2A1E3C",
            color: currentTheme.colors.text,
            boxShadow: currentTheme.shadows.card,
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <div 
            className="position-absolute" 
            style={{ 
              top: "20px", 
              right: "20px", 
              width: "60px", 
              height: "60px", 
              borderRadius: "50%", 
              background: currentTheme.colors.primaryAccent,
              zIndex: 1 
            }}
          ></div>
          <div 
            className="position-absolute" 
            style={{ 
              bottom: "20px", 
              left: "20px", 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              background: currentTheme.colors.secondaryAccent,
              zIndex: 1 
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
                style={{
                  background: currentTheme.button.primary.background,
                  color: currentTheme.button.primary.color,
                  border: currentTheme.button.primary.border,
                  borderRadius: "30px",
                  boxShadow: "3px 3px 0px #000000",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.boxShadow = "5px 5px 0px #000000";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translate(0px, 0px)";
                  e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
                }}
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
                background: theme === "light" ? "#F0E6FF" : "#3D305A",
                border: "4px solid #000",
                borderRadius: "20px",
                padding: "25px 20px",
                height: "100%",
                boxShadow: currentTheme.shadows.card,
                position: "relative",
                overflow: "hidden",
              }}>
                <div className="position-absolute" style={{
                  top: "15px",
                  right: "15px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#C2A9FA",
                  opacity: "0.5",
                  zIndex: "1",
                }}></div>
                
                <div className="position-relative" style={{ zIndex: "2" }}>
                  <h3 className="fw-bold">Fun Quiz</h3>
                  <p>Test your knowledge with a short but exciting quizzes!</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div style={{
                background: theme === "light" ? "#FFE6F7" : "#4D2A50",
                border: "4px solid #000",
                borderRadius: "20px",
                padding: "25px 20px",
                height: "100%",
                boxShadow: currentTheme.shadows.card,
                position: "relative",
                overflow: "hidden",
              }}>
                <div className="position-absolute" style={{
                  bottom: "15px",
                  right: "15px",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#FA74B6",
                  opacity: "0.4",
                  zIndex: "1",
                }}></div>
                
                <div className="position-relative" style={{ zIndex: "2" }}>
                  <h3 className="fw-bold">Creative Activities</h3>
                  <p>Discover enjoyable activities such as coding, crafting, and science.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div style={{
                background: theme === "light" ? "#FFF6D6" : "#4D4430",
                border: "4px solid #000",
                borderRadius: "20px",
                padding: "25px 20px",
                height: "100%",
                boxShadow: currentTheme.shadows.card,
                position: "relative",
                overflow: "hidden",
              }}>
                <div className="position-absolute" style={{
                  bottom: "45px",
                  left: "15px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#FFD44F",
                  opacity: "0.5",
                  zIndex: "1",
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
                      border: "4px solid #000",
                      boxShadow: currentTheme.shadows.card,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translate(-3px, -3px)";
                      e.currentTarget.style.boxShadow = "7px 7px 0px #000000";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translate(0px, 0px)";
                      e.currentTarget.style.boxShadow = currentTheme.shadows.card;
                    }}
                  >
                    {/* Decorative element */}
                    <div 
                      className="position-absolute" 
                      style={{ 
                        top: "-10px", 
                        right: "-10px", 
                        width: "50px", 
                        height: "50px", 
                        borderRadius: "50%", 
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
                            background: currentTheme.button.primary.background,
                            color: currentTheme.button.primary.color,
                            border: "3px solid #000",
                            borderRadius: "30px",
                            boxShadow: "2px 2px 0px #000000",
                            padding: "8px 20px",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translate(-2px, -2px)";
                            e.currentTarget.style.boxShadow = "4px 4px 0px #000000";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translate(0px, 0px)";
                            e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                          }}
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