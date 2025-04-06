import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/ThemeStyles";
import { 
  getQuizById, 
  getQuestionsForQuiz, 
  updateQuizWithQuestions 
} from "../models/quizModel";

export default function EditQuiz() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  // Save the original questions fetched from Firestore
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch quiz data and questions on mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Fetch quiz details
        const quizData = await getQuizById(quizId);
        if (quizData) {
          setTitle(quizData.title);
          setDescription(quizData.description);
        } else {
          alert("Quiz not found.");
          navigate("/");
        }

        // Fetch quiz questions from subcollection
        const fetchedQuestions = await getQuestionsForQuiz(quizId);
        setQuestions(fetchedQuestions);
        setOriginalQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  // Add new question to the list
  const addQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.answer.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({ question: "", options: ["", "", "", ""], answer: "" });
    } else {
      alert("Please provide both a question and the correct answer.");
    }
  };

  // Delete a question from the list (UI only)
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  // Update quiz and questions in Firestore, and delete removed questions
  const updateQuiz = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Please fill in the title and add at least one question.");
      return;
    }

    try {
      await updateQuizWithQuestions(quizId, title, description, questions, originalQuestions);
      alert("Quiz updated successfully!");
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Failed to update quiz.");
    }
  };

  const inputStyles = {
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "10px 15px",
    backgroundColor: theme === "light" ? "#FFFFFF" : "#3A2C50",
    color: currentTheme.colors.text,
  };

  const buttonPrimaryStyle = {
    background: currentTheme.button.primary.background,
    color: currentTheme.button.primary.color,
    border: currentTheme.button.primary.border,
    borderRadius: "30px",
    boxShadow: "3px 3px 0px #000000",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontWeight: "bold",
  };

  const buttonSecondaryStyle = {
    background: theme === "light" ? "#F0E6FF" : "#3D305A",
    color: currentTheme.colors.text,
    border: "3px solid #000000",
    borderRadius: "30px",
    boxShadow: "3px 3px 0px #000000",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontWeight: "bold",
  };

  const buttonDangerStyle = {
    background: theme === "light" ? "#FFE6E6" : "#5A3030",
    color: currentTheme.colors.text,
    border: "2px solid #000000",
    borderRadius: "20px",
    boxShadow: "2px 2px 0px #000000",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontWeight: "bold",
  };

  const buttonHoverHandler = (e) => {
    e.currentTarget.style.transform = "translate(-2px, -2px)";
    e.currentTarget.style.boxShadow = "5px 5px 0px #000000";
  };

  const buttonLeaveHandler = (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
  };

  if (loading) {
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
          <div 
            className="p-4 text-center"
            style={{
              border: "4px solid #000",
              borderRadius: "20px",
              background: theme === "light" ? "#F0E6FF" : "#3D305A",
              boxShadow: currentTheme.shadows.card,
            }}
          >
            <p className="h5 mb-0">Loading quiz data...</p>
          </div>
        </div>
      </div>
    );
  }

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
            background: theme === "light" ? "#F7F2FF" : "#2A1E3C",
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
              Edit 
              <span style={{ 
                color: currentTheme.colors.secondaryAccent, 
                fontStyle: "italic",
                display: "inline",
                marginLeft: "10px",
                position: "relative",
              }}>
                Your Quiz
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
            <p className="lead mb-0">Update your quiz details and questions!</p>
          </div>
        </section>

        {/* Quiz Details Section */}
        <div 
          className="p-4 mb-4 position-relative"
          style={{
            border: "4px solid #000",
            borderRadius: "20px",
            background: theme === "light" ? "#FFE6F7" : "#4D2A50",
            boxShadow: currentTheme.shadows.card,
            overflow: "hidden",
          }}
        >
          <h4 className="fw-bold mb-3">Quiz Details</h4>
          
          <input
            type="text"
            className="form-control my-3"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyles}
          />
          <textarea
            className="form-control my-3"
            placeholder="Quiz Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{...inputStyles, minHeight: "100px"}}
          ></textarea>
        </div>

        {/* Add Questions Section */}
        <div 
          className="p-4 mb-4 position-relative"
          style={{
            border: "4px solid #000",
            borderRadius: "20px",
            background: theme === "light" ? "#F0E6FF" : "#3D305A",
            boxShadow: currentTheme.shadows.card,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div 
            className="position-absolute" 
            style={{ 
              top: "20px", 
              right: "20px", 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              background: "#C2A9FA",
              opacity: "0.5",
              zIndex: 1 
            }}
          ></div>

          <div className="position-relative" style={{ zIndex: 2 }}>
            <h4 className="fw-bold mb-3">Add New Question</h4>
            
            <input
              type="text"
              className="form-control my-3"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              style={inputStyles}
            />
            
            <div className="row g-2">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      let opts = [...newQuestion.options];
                      opts[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: opts });
                    }}
                    style={inputStyles}
                  />
                </div>
              ))}
            </div>
            
            <input
              type="text"
              className="form-control my-3"
              placeholder="Correct Answer"
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, answer: e.target.value })
              }
              style={{...inputStyles, borderColor: currentTheme.colors.secondaryAccent}}
            />
            
            <button 
              className="btn px-4 py-2 mt-2" 
              onClick={addQuestion}
              style={buttonSecondaryStyle}
              onMouseOver={buttonHoverHandler}
              onMouseOut={buttonLeaveHandler}
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Display Existing Questions */}
        <div 
          className="p-4 mb-4"
          style={{
            border: "4px solid #000",
            borderRadius: "20px",
            background: theme === "light" ? "#FFF6D6" : "#4D4430",
            boxShadow: currentTheme.shadows.card,
          }}
        >
          <h4 className="fw-bold mb-3">Existing Questions</h4>
          
          {questions.length === 0 ? (
            <p className="text-center p-4 fst-italic">No questions added yet.</p>
          ) : (
            <div className="list-group">
              {questions.map((q, idx) => (
                <div 
                  key={q.id ? q.id : idx} 
                  className="mb-3 p-3 d-flex justify-content-between align-items-start"
                  style={{
                    border: "3px solid #000",
                    borderRadius: "16px",
                    background: theme === "light" ? "#FFFFFF" : "#3A2C50",
                    boxShadow: "3px 3px 0 #000"
                  }}
                >
                  <div>
                    <div className="d-flex align-items-center">
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
                          border: "2px solid #000"
                        }}
                      >
                        {idx+1}
                      </span>
                      <span className="fw-bold">{q.question}</span>
                    </div>
                    <div className="mt-2 ms-4">
                      <span 
                        className="badge me-2" 
                        style={{
                          background: currentTheme.colors.secondaryAccent,
                          color: "#000",
                          border: "1px solid #000"
                        }}
                      >
                        Answer
                      </span>
                      {q.answer}
                    </div>
                  </div>
                  <button 
                    className="btn btn-sm" 
                    onClick={() => deleteQuestion(idx)}
                    style={buttonDangerStyle}
                  >
                    ✕ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Update Quiz Button */}
        <div className="text-center mb-5">
          <button 
            className="btn btn-lg px-5 py-2" 
            onClick={updateQuiz}
            style={buttonPrimaryStyle}
            onMouseOver={buttonHoverHandler}
            onMouseOut={buttonLeaveHandler}
          >
            ✨ Update Quiz
          </button>
        </div>
      </div>
    </div>
  );
}