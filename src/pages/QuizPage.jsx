import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizRef = doc(db, "quizzes", quizId);
        const quizSnap = await getDoc(quizRef);
        if (quizSnap.exists()) {
          setQuiz(quizSnap.data());

          const questionsRef = collection(db, `quizzes/${quizId}/questions`);
          const questionsSnap = await getDocs(questionsRef);
          const questionList = questionsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
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
  };

  const submitQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <h3 className="text-center">Loading Quiz...</h3>
      ) : quiz ? (
        <>
          {/* Quiz Header */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{quiz.title}</h2>
              <p className="card-text">{quiz.description}</p>
            </div>
          </div>

          {/* Quiz Questions */}
          {questions.map((q, index) => (
            <div key={q.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Question {index + 1}</h5>
                <p className="card-text">{q.question}</p>
                {q.options.map((option, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleAnswerChange(q.id, option)}
                      disabled={score !== null}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button or Score Display */}
          {score === null ? (
            <button className="btn btn-success mt-3" onClick={submitQuiz}>
              Submit Quiz
            </button>
          ) : (
            <div className="alert alert-info mt-3">
              <h4>
                Your Score: {score} / {questions.length}
              </h4>
            </div>
          )}
        </>
      ) : (
        <h3 className="text-center">404 | Quiz not found.</h3>
      )}
    </div>
  );
}
