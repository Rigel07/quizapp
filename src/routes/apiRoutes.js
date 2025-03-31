import express from "express";
import { handleCreateQuiz, handleGetAllQuizzes, handleGetQuizById } from "../controllers/quizController";

const router = express.Router();

router.post("/quizzes", handleCreateQuiz);  // Create a quiz
router.get("/quizzes", handleGetAllQuizzes); // Fetch all quizzes
router.get("/quizzes/:id", handleGetQuizById); // Fetch quiz by ID

export default router;