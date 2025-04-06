import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc, getDoc, query, where, orderBy, limit, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";

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

// Add a question to a quiz
export const addQuestionToQuiz = async (quizId, questionData) => {
  return await addDoc(collection(db, `quizzes/${quizId}/questions`), questionData);
};

// Create a quiz with its questions
export const createQuizWithQuestions = async (quizData, questions) => {
  try {
    // Create the quiz document
    const quizRef = await addDoc(quizCollection, quizData);
    
    // Add all questions to the quiz
    for (let question of questions) {
      await addDoc(collection(db, `quizzes/${quizRef.id}/questions`), question);
    }
    
    return { quizId: quizRef.id };
  } catch (error) {
    console.error("Error creating quiz with questions:", error);
    throw error;
  }
};

// Get questions for a quiz
export const getQuestionsForQuiz = async (quizId) => {
  const questionsRef = collection(db, `quizzes/${quizId}/questions`);
  const snapshot = await getDocs(questionsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Save a user's score for a quiz
export const saveQuizScore = async (scoreData) => {
  try {
    // Make sure we have a timestamp
    if (!scoreData.timestamp) {
      scoreData.timestamp = serverTimestamp();
    }
    
    // Add the score document to the scores collection
    return await addDoc(collection(db, "scores"), scoreData);
  } catch (error) {
    console.error("Error saving quiz score:", error);
    throw error;
  }
};

// Get the most recent score for a user on a specific quiz
export const getRecentScoreForQuiz = async (quizId, userId) => {
  try {
    const scoresQuery = query(
      collection(db, "scores"),
      where("quizId", "==", quizId),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    
    const scoresSnapshot = await getDocs(scoresQuery);
    return !scoresSnapshot.empty 
      ? { id: scoresSnapshot.docs[0].id, ...scoresSnapshot.docs[0].data() } 
      : null;
  } catch (error) {
    console.error("Error getting recent score:", error);
    throw error;
  }
};

// Get recent scores for multiple quizzes
export const getRecentScoresForQuizzes = async (quizIds, userId) => {
  try {
    const scoreData = {};
    
    for (const quizId of quizIds) {
      const score = await getRecentScoreForQuiz(quizId, userId);
      if (score) {
        scoreData[quizId] = score;
      }
    }
    
    return scoreData;
  } catch (error) {
    console.error("Error getting recent scores:", error);
    throw error;
  }
};

// Update a quiz by ID
export const updateQuiz = async (quizId, quizData) => {
  const quizRef = doc(db, "quizzes", quizId);
  return await updateDoc(quizRef, quizData);
};

// Update a question in a quiz
export const updateQuizQuestion = async (quizId, questionId, questionData) => {
  const questionRef = doc(db, `quizzes/${quizId}/questions`, questionId);
  return await updateDoc(questionRef, questionData);
};

// Delete a question from a quiz
export const deleteQuizQuestion = async (quizId, questionId) => {
  const questionRef = doc(db, `quizzes/${quizId}/questions`, questionId);
  return await deleteDoc(questionRef);
};

// Update entire quiz with its questions (handles adding, updating, and deleting questions)
export const updateQuizWithQuestions = async (quizId, quizData, questions, originalQuestions) => {
  try {
    // Update the quiz document
    const quizRef = doc(db, "quizzes", quizId);
    await updateDoc(quizRef, quizData);
    
    // Find questions that were removed
    for (let origQ of originalQuestions) {
      const exists = questions.some((q) => q.id === origQ.id);
      if (!exists) {
        // Delete question from Firestore if it was removed
        await deleteDoc(doc(db, `quizzes/${quizId}/questions`, origQ.id));
      }
    }

    // Update existing questions or add new ones
    for (let q of questions) {
      if (q.id) {
        // Existing question: update it
        const questionRef = doc(db, `quizzes/${quizId}/questions`, q.id);
        await updateDoc(questionRef, {
          question: q.question,
          options: q.options,
          answer: q.answer,
        });
      } else {
        // New question: add it
        await addDoc(collection(db, `quizzes/${quizId}/questions`), q);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error updating quiz with questions:", error);
    throw error;
  }
};
