import { createQuiz, getAllQuizzes, getQuizById } from "../models/quizModel";

// Create a new quiz
export const handleCreateQuiz = async (req, res) => {
  try {
    const quiz = await createQuiz(req.body);
    res.status(201).json({ id: quiz.id, message: "Quiz created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

// Fetch all quizzes
export const handleGetAllQuizzes = async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

// Fetch single quiz
export const handleGetQuizById = async (req, res) => {
  try {
    const quiz = await getQuizById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};
