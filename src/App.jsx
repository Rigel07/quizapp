import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import QuizPage from "./pages/QuizPage";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        {/* Add your quiz component route */}
      </Routes>
    </>
  );
}

export default App;