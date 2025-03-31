import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`container text-center mt-5 bg-${theme} text-${theme === "light" ? "dark" : "light"} p-4 rounded`}>
      <h1 className="display-4 fw-bold">Welcome to the Quiz App</h1>
      <p className="lead">Test your knowledge with fun and challenging quizzes!</p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/create-quiz" className="btn btn-primary btn-lg">
          Create Quiz
        </Link>
        {!user && (
          <Link to="/auth" className="btn btn-outline-secondary btn-lg">
            Login / Register
          </Link>
        )}
      </div>
    </div>
  );
}
