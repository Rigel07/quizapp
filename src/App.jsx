import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import QuizPage from "./pages/QuizPage";
import CreateQuiz from "./pages/CreateQuiz";
import Dashboard from "./pages/Dashboard";
import EditQuiz from "./pages/EditQuiz";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/quiz/:quizId" element={
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        } />
        <Route path="/create-quiz" element={
          <PrivateRoute>
            <CreateQuiz />
          </PrivateRoute>
        } />
        <Route path="/edit-quiz/:quizId" element={
          <PrivateRoute>
            <EditQuiz />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;