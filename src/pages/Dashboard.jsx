import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { themes } from "../styles/ThemeStyles";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const q = query(collection(db, "quizzes"), where("createdBy", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userQuizzes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuizzes(userQuizzes);
      } catch (error) {
        console.error("Error fetching user quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserQuizzes();
    }
  }, [user]);

  return (
    <div 
      className="w-100 py-5 page-transition"
      style={{
        background: currentTheme.colors.background,
        color: currentTheme.colors.text,
        minHeight: "calc(100vh - 136px)",
      }}
    >
      <div className="container">
        {/* Header Section */}
        <section
          className="text-center p-4 mb-5 position-relative"
          style={{
            border: "4px solid #000",
            borderRadius: "24px",
            background: theme === "light" ? "#FFE6F7" : "#4D2A50",
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
              width: "50px", 
              height: "50px", 
              borderRadius: "50%", 
              background: currentTheme.colors.secondaryAccent,
              opacity: "0.5",
              zIndex: 1 
            }}
          ></div>
          <div 
            className="position-absolute" 
            style={{ 
              bottom: "15px", 
              left: "15px", 
              width: "30px", 
              height: "30px", 
              borderRadius: "50%", 
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
              style={{
                border: "4px solid #000",
                borderRadius: "20px",
                background: theme === "light" ? "#F0E6FF" : "#3D305A",
                boxShadow: currentTheme.shadows.card,
              }}
            >
              <p className="h5 mb-0">Loading your quizzes...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div 
              className="p-4 text-center"
              style={{
                border: "4px solid #000",
                borderRadius: "20px",
                background: theme === "light" ? "#F0E6FF" : "#3D305A",
                boxShadow: currentTheme.shadows.card,
              }}
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
                    {/* Decorative elements */}
                    <div 
                      className="position-absolute" 
                      style={{ 
                        top: "-10px", 
                        right: "-10px", 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "50%", 
                        background: "#C2A9FA",
                        opacity: "0.4",
                      }}
                    ></div>
                    
                    <div className="d-flex flex-column h-100">
                      <div className="d-flex align-items-center mb-3">
                        <span 
                          className="me-2 d-inline-block text-center"
                          style={{
                            background: currentTheme.colors.primaryAccent,
                            color: "#000",
                            width: "28px",
                            height: "28px",
                            lineHeight: "28px",
                            borderRadius: "50%",
                            fontWeight: "bold",
                            border: "2px solid #000",
                            flexShrink: 0,
                          }}
                        >
                          {idx+1}
                        </span>
                        <h5 className="fw-bold mb-0" style={{ flex: 1 }}>{quiz.title}</h5>
                      </div>
                      <p className="flex-grow-1">
                        {quiz.description ? quiz.description : <em>No description available</em>}
                      </p>
                      <div className="d-flex justify-content-between pt-3 mt-auto">
                        <Link
                          to={`/edit-quiz/${quiz.id}`}
                          className="btn fw-semibold"
                          style={{
                            background: theme === "light" ? "#F0E6FF" : "#3D305A",
                            color: currentTheme.colors.text,
                            border: "3px solid #000000",
                            borderRadius: "30px",
                            boxShadow: "2px 2px 0px #000000",
                            padding: "6px 15px",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translate(-1px, -1px)";
                            e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translate(0px, 0px)";
                            e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                          }}
                        >
                          ✏️ Edit
                        </Link>
                        <Link
                          to={`/quiz/${quiz.id}`}
                          className="btn fw-semibold"
                          style={{
                            background: currentTheme.button.primary.background,
                            color: currentTheme.button.primary.color,
                            border: "3px solid #000",
                            borderRadius: "30px",
                            boxShadow: "2px 2px 0px #000000",
                            padding: "6px 15px",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translate(-1px, -1px)";
                            e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translate(0px, 0px)";
                            e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                          }}
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