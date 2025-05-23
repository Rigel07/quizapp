import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";
import { getQuizById, getQuestionsForQuiz, saveQuizScore } from "../models/quizModel";

export default function QuizPage() {
  const { quizId } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempted, setAttempted] = useState({});
  const [savingScore, setSavingScore] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Get quiz details
        const quizData = await getQuizById(quizId);
        if (quizData) {
          setQuiz(quizData);
          
          // Get quiz questions
          const questionList = await getQuestionsForQuiz(quizId);
          setQuestions(questionList);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (qId, answer) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
    setAttempted((prev) => ({ ...prev, [qId]: true }));
  };

  const submitQuiz = async () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        calculatedScore++;
      }
    });
    
    setScore(calculatedScore);
    
    // Save score to firestore if user is logged in
    if (user) {
      try {
        setSavingScore(true);
        await saveQuizScore({
          quizId,
          userId: user.uid,
          score: calculatedScore,
          total: questions.length,
          quizTitle: quiz.title
        });
      } catch (error) {
        console.error("Error saving score:", error);
      } finally {
        setSavingScore(false);
      }
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setCurrentQuestion(0);
    setAttempted({});
  };

  return (
    <div 
      className="w-100 py-5 page-transition"
      style={styles.pageContainer}
    >
      <div className="container">
        {loading ? (
          <div 
            className="p-4 text-center"
            style={styles.purpleCard}
          >
            <p className="h5 mb-0">Loading quiz...</p>
          </div>
        ) : quiz ? (
          <>
            {/* Quiz Header */}
            <div 
              className="text-center p-4 mb-4 position-relative"
              style={styles.headerCard}
            >
              {/* Decorative elements */}
              <div 
                className="position-absolute" 
                style={{ 
                  ...currentTheme.components.decorativeCircle,
                  top: "15px", 
                  right: "15px", 
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
                  {quiz.title}
                </h1>
                <p className="lead mb-0">
                  {quiz.description || "Test your knowledge with this quiz!"}
                </p>
              </div>
            </div>

            <div className="row">
              {/* Question Navigation Sidebar */}
              <div className="col-md-3 mb-4">
                <div 
                  className="p-4 position-relative"
                  style={styles.pinkCard}
                >
                  <h5 className="fw-bold mb-3 text-center">Questions</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {questions.map((q, index) => (
                      <button
                        key={q.id}
                        className="d-flex align-items-center justify-content-center"
                        onClick={() => navigateToQuestion(index)}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: attempted[q.id]
                            ? theme === "light" ? "#C2A9FA" : "#614F9E"
                            : theme === "light" ? "#FFFFFF" : "#3A2C50",
                          color: currentTheme.colors.text,
                          border: currentQuestion === index 
                            ? `3px solid ${currentTheme.colors.primaryAccent}`
                            : "3px solid #000",
                          boxShadow: "2px 2px 0px #000000",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseOver={(e) => {
                          if (currentQuestion !== index) {
                            e.currentTarget.style.transform = "translate(-2px, -2px)";
                            e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
                          }
                        }}
                        onMouseOut={(e) => {
                          if (currentQuestion !== index) {
                            e.currentTarget.style.transform = "translate(0px, 0px)";
                            e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                          }
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          background: theme === "light" ? "#FFFFFF" : "#3A2C50",
                          border: "2px solid #000",
                          marginRight: "10px"
                        }}
                      ></div>
                      <small>Not attempted</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <div 
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          background: theme === "light" ? "#C2A9FA" : "#614F9E",
                          border: "2px solid #000",
                          marginRight: "10px"
                        }}
                      ></div>
                      <small>Attempted</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Question */}
              <div className="col-md-9">
                {questions.length > 0 && (
                  <div 
                    className="p-4 mb-4"
                    style={styles.purpleCard}
                  >
                    <div className="d-flex align-items-center mb-4">
                      <span style={styles.questionCounter}>
                        {currentQuestion + 1}
                      </span>
                      <h4 className="fw-bold mb-0">
                        {questions[currentQuestion].question}
                      </h4>
                    </div>

                    <div className="mb-4">
                      {questions[currentQuestion].options.map((option, idx) => (
                        <div 
                          key={idx} 
                          className="mb-3"
                          onClick={() => {
                            if (score === null) {
                              handleAnswerChange(questions[currentQuestion].id, option);
                            }
                          }}
                          style={{
                            border: "3px solid #000",
                            borderRadius: "12px",
                            padding: "10px 15px",
                            cursor: score === null ? "pointer" : "default",
                            background: answers[questions[currentQuestion].id] === option 
                              ? theme === "light" ? "#C2A9FA" : "#614F9E"
                              : theme === "light" ? "#FFFFFF" : "#3A2C50",
                            transition: "transform 0.1s, box-shadow 0.1s",
                          }}
                          onMouseOver={(e) => {
                            if (score === null) {
                              e.currentTarget.style.transform = "translate(-2px, -2px)";
                              e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translate(0px, 0px)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <div 
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                border: "2px solid #000",
                                marginRight: "15px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: answers[questions[currentQuestion].id] === option 
                                  ? currentTheme.colors.primaryAccent 
                                  : "transparent",
                              }}
                            >
                              {answers[questions[currentQuestion].id] === option && (
                                <span style={{ fontSize: "12px", fontWeight: "bold" }}>✓</span>
                              )}
                            </div>
                            <div>{option}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      <button 
                        className="btn"
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestion === 0}
                        style={{
                          ...styles.secondaryButton,
                          opacity: currentQuestion === 0 ? 0.6 : 1,
                          padding: "10px 20px"
                        }}
                        onMouseOver={currentQuestion !== 0 ? commonStyles.buttonHoverEffect : null}
                        onMouseOut={currentQuestion !== 0 ? commonStyles.buttonLeaveEffect : null}
                      >
                        ← Previous
                      </button>
                      
                      {currentQuestion === questions.length - 1 ? (
                        score === null ? (
                          <button 
                            className="btn"
                            onClick={submitQuiz}
                            style={{
                              ...styles.primaryButton,
                              padding: "10px 20px"
                            }}
                            onMouseOver={commonStyles.buttonHoverEffect}
                            onMouseOut={commonStyles.buttonLeaveEffect}
                            disabled={savingScore}
                          >
                            {savingScore ? "Submitting..." : "✨ Submit Quiz"}
                          </button>
                        ) : null
                      ) : (
                        <button 
                          className="btn"
                          onClick={goToNextQuestion}
                          style={{
                            ...styles.primaryButton,
                            padding: "10px 20px"
                          }}
                          onMouseOver={commonStyles.buttonHoverEffect}
                          onMouseOut={commonStyles.buttonLeaveEffect}
                        >
                          Next →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Score Display */}
                {score !== null && (
                  <div 
                    className="p-4 text-center"
                    style={styles.yellowCard}
                  >
                    <div className="position-relative py-3">
                      <h3 className="fw-bold mb-3">Quiz Complete! 🎉</h3>
                      <div 
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          border: "4px solid #000",
                          background: theme === "light" ? "#FFD44F" : "#FFD44F",
                          color: "#000",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0 auto 20px",
                          boxShadow: "3px 3px 0px #000000",
                        }}
                      >
                        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{score}</div>
                        <div style={{ fontSize: "14px" }}>out of {questions.length}</div>
                      </div>
                      
                      <p className="fw-semibold">
                        {score === questions.length 
                          ? "Perfect score! Excellent job!" 
                          : score >= questions.length / 2 
                            ? "Well done! You did great!" 
                            : "Good effort! Keep practicing!"}
                      </p>

                      {/* Retry Quiz Button */}
                      <button 
                        className="btn btn-lg mt-3"
                        onClick={resetQuiz}
                        style={{
                          ...styles.secondaryButton,
                          padding: "10px 24px"
                        }}
                        onMouseOver={commonStyles.buttonHoverEffect}
                        onMouseOut={commonStyles.buttonLeaveEffect}
                      >
                        🔄 Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div 
            className="p-5 text-center"
            style={styles.purpleCard}
          >
            <h3 className="fw-bold mb-0">404 | Quiz not found.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
