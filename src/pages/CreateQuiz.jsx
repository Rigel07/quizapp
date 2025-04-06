import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { themes, getComponentStyles, commonStyles } from "../styles/ThemeStyles";
import { createQuizWithQuestions } from "../models/quizModel";

export default function CreateQuiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const styles = getComponentStyles(theme);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });
  const [isCreating, setIsCreating] = useState(false);

  const addQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.answer.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({ question: "", options: ["", "", "", ""], answer: "" });
    } else {
      alert("Please provide both a question and the correct answer.");
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const createQuiz = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Please fill all fields and add at least one question.");
      return;
    }

    try {
      setIsCreating(true);
      const quizData = {
        title,
        description,
        createdBy: user.uid,
        createdAt: new Date()
      };

      const { quizId } = await createQuizWithQuestions(quizData, questions);

      alert("Quiz created successfully!");
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div 
      className="w-100 py-5 page-transition"
      style={styles.pageContainer}
    >
      <div className="container">
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
              Create a 
              <span style={{ 
                color: currentTheme.colors.secondaryAccent, 
                fontStyle: "italic",
                display: "inline",
                marginLeft: "10px",
                position: "relative",
              }}>
                New Quiz
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
            <p className="lead mb-0">Design exciting questions to challenge quiz takers!</p>
          </div>
        </div>
        
        {/* Quiz Details Section */}
        <div 
          className="p-4 mb-4 position-relative"
          style={styles.pinkCard}
        >
          <h4 className="fw-bold mb-3">Quiz Details</h4>
          
          <input
            type="text"
            className="form-control my-3"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            className="form-control my-3"
            placeholder="Quiz Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{...styles.input, minHeight: "100px"}}
          ></textarea>
        </div>

        {/* Add Questions Section */}
        <div 
          className="p-4 mb-4 position-relative"
          style={styles.purpleCard}
        >
          <div 
            className="position-absolute" 
            style={{ 
              ...currentTheme.components.decorativeCircle,
              top: "20px", 
              right: "20px", 
              width: "40px", 
              height: "40px", 
              background: "#C2A9FA",
              opacity: "0.5",
              zIndex: 1 
            }}
          ></div>

          <div className="position-relative" style={{ zIndex: 2 }}>
            <h4 className="fw-bold mb-3">Add Questions</h4>
            
            <input
              type="text"
              className="form-control my-3"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              style={styles.input}
            />
            
            <div className="row g-2">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      let opts = [...newQuestion.options];
                      opts[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: opts });
                    }}
                    style={styles.input}
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
              style={{...styles.input, borderColor: currentTheme.colors.secondaryAccent}}
            />
            
            <button 
              className="btn px-4 py-2 mt-2" 
              onClick={addQuestion}
              style={styles.secondaryButton}
              onMouseOver={commonStyles.buttonHoverEffect}
              onMouseOut={commonStyles.buttonLeaveEffect}
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Display Added Questions */}
        <div 
          className="p-4 mb-4"
          style={styles.yellowCard}
        >
          <h4 className="fw-bold mb-3">Added Questions</h4>
          
          {questions.length === 0 ? (
            <p className="text-center p-4 fst-italic">No questions added yet.</p>
          ) : (
            <div className="list-group">
              {questions.map((q, idx) => (
                <div 
                  key={idx} 
                  className="mb-3 p-3 d-flex justify-content-between align-items-start"
                  style={{
                    border: currentTheme.borders.input,
                    borderRadius: "16px",
                    background: theme === "light" ? "#FFFFFF" : "#3A2C50",
                    boxShadow: "3px 3px 0 #000"
                  }}
                >
                  <div>
                    <div className="d-flex align-items-center">
                      <span style={styles.questionCounter}>
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
                    style={styles.dangerButton}
                  >
                    ✕ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Quiz Button */}
        <div className="text-center">
          <button 
            className="btn btn-lg px-5 py-2" 
            onClick={createQuiz}
            disabled={isCreating}
            style={{
              ...styles.primaryButton,
              opacity: isCreating ? 0.7 : 1,
              cursor: isCreating ? "not-allowed" : "pointer"
            }}
            onMouseOver={commonStyles.buttonHoverEffect}
            onMouseOut={commonStyles.buttonLeaveEffect}
          >
            {isCreating ? "Creating..." : "✨ Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}
