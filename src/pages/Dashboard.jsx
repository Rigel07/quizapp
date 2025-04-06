import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";
import { getRecentScoresForQuizzes } from "../models/quizModel";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);
  const [quizzes, setQuizzes] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      if (!user) return;
      
      try {
        const q = query(collection(db, "quizzes"), where("createdBy", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userQuizzes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuizzes(userQuizzes);
        
        // Fetch recent scores using our model function
        if (userQuizzes.length > 0) {
          const quizIds = userQuizzes.map(quiz => quiz.id);
          const scoreData = await getRecentScoresForQuizzes(quizIds, user.uid);
          setQuizScores(scoreData);
        }
      } catch (error) {
        console.error("Error fetching user quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserQuizzes();
  }, [user]);

  return (
    <div 
      className="w-100 py-5 page-transition"
      style={styles.pageContainer}
    >
      <div className="container">
        {/* Header Section */}
        <section
          className="text-center p-4 mb-5 position-relative"
          style={styles.pinkCard}
        >
          {/* Decorative elements */}
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              top: "20px", 
              right: "20px", 
              width: "50px", 
              height: "50px", 
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
              width: "30px", 
              height: "30px", 
              background: currentTheme.colors.primaryAccent,
              opacity: "0.4",
              zIndex: 1 
            }}
          ></div>

          <div className="position-relative" style={{ zIndex: 2 }}>
            <h1 className="display-5 fw-bold mb-2">
              My 
              <span style={{ 
                color: currentTheme.colors.secondaryAccent, 
                fontStyle: "italic",
                display: "inline",
                marginLeft: "10px",
                position: "relative",
              }}>
                Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "0",
                  right: "0",
                }}>
                  <path d="M0 4C25 0 75 8 100 4" stroke={currentTheme.colors.secondaryAccent} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="lead mb-0">Manage all your created quizzes in one place!</p>
          </div>
        </section>

        {/* Create New Quiz Button */}
        <div className="text-center mb-5">
          <Link
            to="/create-quiz"
            className="btn btn-lg fw-bold px-4 py-2 page-transition"
            style={styles.primaryButton}
            onMouseOver={commonStyles.buttonHoverEffect}
            onMouseOut={commonStyles.buttonLeaveEffect}
          >
            ✨ Create New Quiz
          </Link>
        </div>

        {/* My Quizzes Section */}
        <section>
          <h2 className="mb-4 fw-bold">
            <span style={{ 
              color: currentTheme.colors.primaryAccent, 
              display: "inline",
              position: "relative",
            }}>
              My Quizzes
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" style={{
                position: "absolute",
                bottom: "-3px",
                left: "0",
                right: "0",
              }}>
                <path d="M0 1.5H100" stroke={currentTheme.colors.primaryAccent} strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          {loading ? (
            <div 
              className="p-4 text-center"
              style={styles.purpleCard}
            >
              <p className="h5 mb-0">Loading your quizzes...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div 
              className="p-4 text-center"
              style={styles.purpleCard}
            >
              <p className="h5 mb-3">You haven't created any quizzes yet.</p>
              <p>Start by creating your first quiz!</p>
            </div>
          ) : (
            <div className="row g-4">
              {quizzes.map((quiz, idx) => (
                <div key={quiz.id} className="col-md-4">
                  <div
                    className="h-100 p-4 page-transition"
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
                    {/* Decorative elements */}
                    <div 
                      className="position-absolute" 
                      style={{ 
                        ...currentTheme.components.decorativeCircle,
                        top: "-10px", 
                        right: "-10px", 
                        width: "40px", 
                        height: "40px", 
                        background: "#C2A9FA",
                        opacity: "0.4",
                      }}
                    ></div>
                    
                    <div className="d-flex flex-column h-100">
                      <div className="d-flex align-items-center mb-2">
                        <span style={styles.questionCounter}>
                          {idx+1}
                        </span>
                        <h5 className="fw-bold mb-0" style={{ flex: 1 }}>{quiz.title}</h5>
                      </div>
                      
                      <p className="mb-2">
                        {quiz.description ? quiz.description : <em>No description available</em>}
                      </p>
                      
                      {/* Recent Score Display */}
                      {quizScores[quiz.id] && (
                        <div 
                          className="mb-2 d-flex align-items-center"
                          style={{
                            borderRadius: "12px",
                            backgroundColor: currentTheme.colors.purpleBackground,
                            padding: "5px 10px",
                            marginLeft: "30px"
                          }}
                        >
                          <span className="me-2" style={{ fontSize: "14px" }}>Last score:</span>
                          <div 
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              border: currentTheme.borders.thin,
                              background: currentTheme.colors.primaryAccent,
                              color: "#000",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontWeight: "bold",
                              fontSize: "14px",
                              marginRight: "5px"
                            }}
                          >
                            {quizScores[quiz.id].score}
                          </div>
                          <span style={{ fontSize: "14px" }}>/ {quizScores[quiz.id].total}</span>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between pt-3 mt-auto">
                        <Link
                          to={`/edit-quiz/${quiz.id}`}
                          className="btn fw-semibold"
                          style={styles.secondaryButton}
                          onMouseOver={commonStyles.smallButtonHoverEffect}
                          onMouseOut={commonStyles.smallButtonLeaveEffect}
                        >
                          ✏️ Edit
                        </Link>
                        <Link
                          to={`/quiz/${quiz.id}`}
                          className="btn fw-semibold"
                          style={styles.primaryButton}
                          onMouseOver={commonStyles.smallButtonHoverEffect}
                          onMouseOut={commonStyles.smallButtonLeaveEffect}
                        >
                          👁️ View
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