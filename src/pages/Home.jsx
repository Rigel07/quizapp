import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getAllQuizzes } from "../models/quizModel";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
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
    <div className={styles.pageContainer}>
      <div className="container">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          {/* Decorative elements */}
          <div className={`${styles.decorativeCircle} ${styles.decorativeCircleTopRight}`}></div>
          <div className={`${styles.decorativeCircle} ${styles.decorativeCircleBottomLeft}`}></div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              The best place to 
              <span className={styles.heroTitleLearn}>
                learn
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 100 8" fill="none" className={styles.underlineLearn}>
                  <path d="M0 4C25 0 75 8 100 4" stroke="var(--color-secondary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                and
              </span>
              <span className={styles.heroTitlePlay}>
                play
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 100 3" fill="none" className={styles.underlinePlay}>
                  <path d="M0 1.5H100" stroke="var(--color-primary-accent)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Fun, exciting quizzes to test your brain power!
            </p>
            
            <div className="d-flex justify-content-center">
              <Link
                to="/create-quiz"
                className={`${styles.heroButton} button-hover-effect`}
              >
                ✨ Create Quiz
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>
            Our 
            <span className={styles.featuresInteractive}>
              interactive&nbsp;
            </span> 
            features
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className={`${styles.featureCard} ${styles.featureCardPurple}`}>
                <div className={`${styles.decorativeCircle} ${styles.decorativePurpleCircle}`}></div>
                
                <div className={styles.featureCardContent}>
                  <h3 className={styles.featureCardTitle}>Fun Quiz</h3>
                  <p>Test your knowledge with a short but exciting quizzes!</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className={`${styles.featureCard} ${styles.featureCardPink}`}>
                <div className={`${styles.decorativeCircle} ${styles.decorativePinkCircle}`}></div>
                
                <div className={styles.featureCardContent}>
                  <h3 className={styles.featureCardTitle}>Creative Activities</h3>
                  <p>Discover enjoyable activities such as coding, crafting, and science.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className={`${styles.featureCard} ${styles.featureCardYellow}`}>
                <div className={`${styles.decorativeCircle} ${styles.decorativeYellowCircle}`}></div>
                
                <div className={styles.featureCardContent}>
                  <h3 className={styles.featureCardTitle}>Learn with Games</h3>
                  <p>Learn something new while having fun playing games!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section className={styles.quizzesSection}>
          <h2 className={styles.quizzesTitle}>Explore Quizzes</h2>

          {loading ? (
            <p className={styles.loadingText}>Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <p className={styles.loadingText}>No quizzes found. Be the first to create one!</p>
          ) : (
            <div className="row g-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="col-md-4">
                  <div className={styles.quizCard}>
                    {/* Decorative element */}
                    <div className={`${styles.decorativeCircle} ${styles.quizCardDecorative}`}></div>
                    
                    <div className={styles.quizCardBody}>
                      <h5 className={styles.quizCardTitle}>{quiz.title}</h5>
                      <p className={styles.quizCardText}>
                        {quiz.description || <em>No description available</em>}
                      </p>
                      <div className={styles.textEnd}>
                        <Link
                          to={`/quiz/${quiz.id}`}
                          className={`${styles.quizCardButton} small-button-hover-effect`}
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