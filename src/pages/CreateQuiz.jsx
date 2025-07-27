import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { createQuizWithQuestions } from "../models/quizModel";
import styles from "../styles/CreateQuiz.module.css";

export default function CreateQuiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
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
    <div className={styles.pageContainer}>
      <div className="container">
        <div className={styles.mainCard}>
          {/* Decorative elements */}
          <div className={`${styles.decorativeCircle} ${styles.mainCardDecorative1}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.mainCardDecorative2}`}></div>

          <div className={styles.cardContent}>
            <h1 className={styles.pageTitle}>
              Create a&nbsp;
              <span className={styles.pageTitleAccent}>
                New Quiz
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" className={styles.titleUnderline}>
                  <path d="M0 4C25 0 75 8 100 4" stroke="var(--color-secondary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className={`${styles.marginBottom2} ${styles.textCenter} lead`}>Design exciting questions to challenge quiz takers!</p>
          </div>
        </div>
        
        {/* Quiz Details Section */}
        <div className={styles.mainCard}>
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Quiz Details</h4>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Quiz Title *</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter your quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description (Optional)</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Describe what your quiz is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Add Questions Section */}
        <div className={styles.mainCard}>
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Add Questions</h4>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Question *</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter your question"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Answer Options</label>
              <div className={styles.optionsGrid}>
                {newQuestion.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    className={styles.smallFormInput}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      let opts = [...newQuestion.options];
                      opts[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: opts });
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Correct Answer *</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter the correct answer"
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer: e.target.value })
                }
              />
            </div>
            
            <button 
              className={styles.buttonSecondary}
              onClick={addQuestion}
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Display Added Questions */}
        <div className={styles.mainCard}>
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Added Questions ({questions.length})</h4>
            
            {questions.length === 0 ? (
              <div className={styles.noQuestions}>
                <p className={styles.noQuestionsText}>No questions added yet. Add your first question above!</p>
              </div>
            ) : (
              <div>
                {questions.map((q, idx) => (
                  <div key={idx} className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                      <div className={styles.questionNumber}>
                        {idx + 1}
                      </div>
                      <button 
                        className={styles.buttonDanger}
                        onClick={() => deleteQuestion(idx)}
                      >
                        ✕ Delete
                      </button>
                    </div>
                    
                    <div className={styles.questionText}>{q.question}</div>
                    
                    {q.options.some(opt => opt.trim()) && (
                      <div>
                        <div className={styles.correctAnswerLabel}>Options:</div>
                        <ul className={styles.optionsList}>
                          {q.options.filter(opt => opt.trim()).map((option, optIdx) => (
                            <li key={optIdx} className={styles.optionItem}>
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className={styles.correctAnswerLabel}>Correct Answer:</div>
                    <div className={styles.correctAnswer}>{q.answer}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Quiz Button */}
        <div className={styles.textCenter}>
          <button 
            className={`${styles.buttonPrimary} ${styles.buttonFullWidth}`}
            onClick={createQuiz}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "✨ Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}
