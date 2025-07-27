import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getQuizById, getQuestionsForQuiz, saveQuizScore } from "../models/quizModel";
import styles from "../styles/QuizPage.module.css";

export default function QuizPage() {
  const { quizId } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  
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
    <div className={styles.pageContainer}>
      <div className="container">
        {loading ? (
          <div className={styles.loadingCard}>
            <p className={styles.loadingText}>Loading quiz...</p>
          </div>
        ) : quiz ? (
          <>
            {/* Quiz Header */}
            <div className={styles.quizHeader}>
              {/* Decorative elements */}
              <div className={`${styles.decorativeCircle} ${styles.quizHeaderDecorative1}`}></div>
              <div className={`${styles.decorativeCircle} ${styles.quizHeaderDecorative2}`}></div>

              <div className={styles.cardContent}>
                <h1 className={styles.quizTitle}>
                  {quiz.title}
                </h1>
                <p className={styles.quizDescription}>
                  {quiz.description || "Test your knowledge with this quiz!"}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <div className={styles.progressTitle}>Progress</div>
                <div className={styles.progressInfo}>
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            {questions.length > 0 && (
              <div className={styles.questionCard}>
                <div className={`${styles.decorativeCircle} ${styles.questionCardDecorative}`}></div>
                
                <div className={styles.cardContent}>
                  <div className={styles.questionHeader}>
                    <div className={styles.questionNumber}>
                      {currentQuestion + 1}
                    </div>
                    <h4 className={styles.questionText}>
                      {questions[currentQuestion].question}
                    </h4>
                  </div>

                  <div className={styles.optionsContainer}>
                    {questions[currentQuestion].options.map((option, idx) => (
                      <div key={idx} className={styles.optionItem}>
                        <label 
                          className={styles.optionLabel}
                          style={{
                            backgroundColor: answers[questions[currentQuestion].id] === option 
                              ? 'var(--color-purple-background)' 
                              : 'var(--color-input-background)'
                          }}
                        >
                          <input
                            type="radio"
                            className={styles.optionInput}
                            name={`question-${questions[currentQuestion].id}`}
                            value={option}
                            checked={answers[questions[currentQuestion].id] === option}
                            onChange={() => {
                              if (score === null) {
                                handleAnswerChange(questions[currentQuestion].id, option);
                              }
                            }}
                            disabled={score !== null}
                          />
                          <span className={styles.optionText}>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className={styles.navigationButtons}>
                    <button 
                      className={styles.buttonSecondary}
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      ← Previous
                    </button>
                    
                    {currentQuestion === questions.length - 1 ? (
                      score === null ? (
                        <button 
                          className={styles.buttonPrimary}
                          onClick={submitQuiz}
                          disabled={savingScore}
                        >
                          {savingScore ? "Submitting..." : "✨ Submit Quiz"}
                        </button>
                      ) : null
                    ) : (
                      <button 
                        className={styles.buttonPrimary}
                        onClick={goToNextQuestion}
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Score Display */}
            {score !== null && (
              <div className={styles.resultsCard}>
                <div className={`${styles.decorativeCircle} ${styles.resultsCardDecorative1}`}></div>
                <div className={`${styles.decorativeCircle} ${styles.resultsCardDecorative2}`}></div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.resultsTitle}>Quiz Complete! 🎉</h3>
                  <div className={styles.scoreDisplay}>{score}</div>
                  <div className={styles.scoreText}>out of {questions.length} questions correct</div>
                  
                  <p className={styles.scoreText}>
                    {score === questions.length 
                      ? "Perfect score! Excellent job!" 
                      : score >= questions.length / 2 
                        ? "Well done! You did great!" 
                        : "Good effort! Keep practicing!"}
                  </p>

                  <div>
                    <button 
                      className={styles.retakeButton}
                      onClick={resetQuiz}
                    >
                      🔄 Try Again
                    </button>
                    <a href="/" className={styles.homeLink}>
                      🏠 Go Home
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.loadingCard}>
            <h3 className={styles.loadingText}>404 | Quiz not found.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
