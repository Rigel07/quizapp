import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
  getQuizById, 
  getQuestionsForQuiz, 
  updateQuizWithQuestions 
} from "../models/quizModel";
import styles from "../styles/EditQuiz.module.css";

export default function EditQuiz() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
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

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className="container">
          <div className={styles.loadingCard}>
            <p className={styles.loadingText}>Loading quiz data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        {/* Header Section */}
        <div className={styles.headerCard}>
          {/* Decorative elements */}
          <div className={`${styles.decorativeCircle} ${styles.headerDecorative1}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.headerDecorative2}`}></div>

          <div className={styles.cardContent}>
            <h1 className={styles.pageTitle}>
              Edit&nbsp;
              <span className={styles.pageTitleAccent}>
                Your Quiz
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" className={styles.titleUnderline}>
                  <path d="M0 4C25 0 75 8 100 4" stroke="var(--color-secondary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className={styles.pageSubtitle}>Update your quiz details and questions!</p>
          </div>
        </div>

        {/* Quiz Details Section */}
        <div className={styles.sectionCard}>
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Quiz Details</h4>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Quiz Title *</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description (Optional)</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Quiz Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Add Questions Section */}
        <div className={styles.purpleCard}>
          <div className={`${styles.decorativeCircle} ${styles.sectionDecorative}`}></div>
          
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Add New Question</h4>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Question *</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Question"
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
                placeholder="Correct Answer"
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer: e.target.value })
                }
                style={{borderColor: 'var(--color-secondary-accent)'}}
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

        {/* Display Existing Questions */}
        <div className={styles.yellowCard}>
          <div className={styles.cardContent}>
            <h4 className={styles.sectionTitle}>Existing Questions</h4>
            
            {questions.length === 0 ? (
              <div className={styles.noQuestions}>
                <p className={styles.noQuestionsText}>No questions added yet.</p>
              </div>
            ) : (
              <div>
                {questions.map((q, idx) => (
                  <div key={q.id ? q.id : idx} className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                      <div className="d-flex align-items-center">
                        <div className={styles.questionNumber}>
                          {idx + 1}
                        </div>
                        <div className={styles.questionText}>{q.question}</div>
                      </div>
                      <button 
                        className={styles.buttonDanger}
                        onClick={() => deleteQuestion(idx)}
                      >
                        ✕ Delete
                      </button>
                    </div>
                    
                    <div className="mt-2 ms-4">
                      <span className={styles.answerBadge}>Answer</span>
                      <span className={styles.answerText}>{q.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Update Quiz Button */}
        <div className={styles.textCenter}>
          <button 
            className={`${styles.buttonPrimary} ${styles.buttonFullWidth}`}
            onClick={updateQuiz}
          >
            ✨ Update Quiz
          </button>
        </div>
      </div>
    </div>
  );
}