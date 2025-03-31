import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

const quizCollection = collection(db, "quizzes");

// Add a new quiz
export const createQuiz = async (quizData) => {
  return await addDoc(quizCollection, quizData);
};

// Get all quizzes
export const getAllQuizzes = async () => {
  const snapshot = await getDocs(quizCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get a single quiz by ID
export const getQuizById = async (quizId) => {
  const quizRef = doc(db, "quizzes", quizId);
  const snapshot = await getDoc(quizRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};
