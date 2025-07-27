import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { getRecentScoresForQuizzes } from "../models/quizModel";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
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
    <div className={styles.dashboardContainer}>
      <div className="container">
        {/* Header Section */}
        <section className={styles.headerSection}>
          {/* Decorative elements */}
          <div className={`${styles.decorativeCircle} ${styles.headerDecorativeTop}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.headerDecorativeBottom}`}></div>

          <div className={styles.contentWithDecoration}>
            <h1 className={styles.headerTitle}>
              My 
              <span className={styles.headerTitleDashboard}>
                Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" className={styles.headerUnderline}>
                  <path d="M0 4C25 0 75 8 100 4" stroke="var(--color-secondary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className={styles.headerSubtitle}>Manage all your created quizzes in one place!</p>
          </div>
        </section>

        {/* Create New Quiz Button */}
        <div className={styles.createButtonSection}>
          <Link
            to="/create-quiz"
            className={styles.createButton}
          >
            ✨ Create New Quiz
          </Link>
        </div>

        {/* My Quizzes Section */}
        <section className={styles.quizzesSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleSpan}>
              My Quizzes
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" className={styles.sectionUnderline}>
                <path d="M0 1.5H100" stroke="var(--color-primary-accent)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          {loading ? (
            <div className={styles.loadingCard}>
              <p className={styles.loadingText}>Loading your quizzes...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className={styles.emptyStateCard}>
              <div className={`${styles.decorativeCircle} ${styles.emptyStateDecorative}`}></div>
              <div className={styles.contentWithDecoration}>
                <div className={styles.emptyStateIcon}>📝</div>
                <h3 className={styles.emptyStateTitle}>No Quizzes Yet</h3>
                <p className={styles.emptyStateText}>You haven't created any quizzes yet. Start by creating your first quiz!</p>
                <Link to="/create-quiz" className={styles.createButton}>
                  ✨ Create Your First Quiz
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {quizzes.map((quiz, idx) => (
                <div key={quiz.id} className="col-md-4">
                  <div className={styles.quizCard}>
                    {/* Decorative elements */}
                    <div className={`${styles.decorativeCircle} ${styles.quizCardDecorative}`}></div>
                    
                    <div className={styles.quizCardBody}>
                      <div className="d-flex align-items-center mb-3">
                        <div className={styles.questionNumber}>
                          {idx + 1}
                        </div>
                        <h5 className={styles.quizCardTitle}>{quiz.title}</h5>
                      </div>
                      
                      <p className={styles.quizCardDescription}>
                        {quiz.description ? quiz.description : <em>No description available</em>}
                      </p>
                      
                      {/* Recent Score Display */}
                      {quizScores[quiz.id] && (
                        <div className={styles.quizCardMeta}>
                          <span>Last score: </span>
                          <span className={styles.scoresBadge}>
                            {quizScores[quiz.id].score}/{quizScores[quiz.id].total}
                          </span>
                        </div>
                      )}
                      
                      <div className={styles.quizCardActions}>
                        <Link
                          to={`/edit-quiz/${quiz.id}`}
                          className={styles.actionButton}
                        >
                          ✏️ Edit
                        </Link>
                        <Link
                          to={`/quiz/${quiz.id}`}
                          className={styles.actionButton}
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