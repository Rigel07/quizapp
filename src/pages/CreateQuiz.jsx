import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config"; // Ensure Firebase is configured
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });

  const addQuestion = () => {
    // Check required fields: question text and answer should not be empty
    if (newQuestion.question.trim() && newQuestion.answer.trim()) {
      setQuestions([...questions, newQuestion]);
      // Clear the newQuestion fields for next input
      setNewQuestion({ question: "", options: ["", "", "", ""], answer: "" });
    } else {
      alert("Please provide both a question and the correct answer.");
    }
  };

  const createQuiz = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Please fill all fields and add at least one question.");
      return;
    }

    try {
      // Create the quiz document in Firestore
      const quizRef = await addDoc(collection(db, "quizzes"), {
        title,
        description,
        createdBy: user.uid
      });

      // Save each question as a subcollection document
      for (let q of questions) {
        await addDoc(collection(db, `quizzes/${quizRef.id}/questions`), q);
      }

      alert("Quiz created successfully!");
      navigate(`/quiz/${quizRef.id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Quiz</h2>
      
      {/* Quiz Details Section */}
      <div className="card p-3 mb-4">
        <h4>Quiz Details</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control my-2"
          placeholder="Quiz Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Add Questions Section */}
      <div className="card p-3 mb-4">
        <h4>Add Questions</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
        />
        {newQuestion.options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="form-control my-1"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              let opts = [...newQuestion.options];
              opts[index] = e.target.value;
              setNewQuestion({ ...newQuestion, options: opts });
            }}
          />
        ))}
        <input
          type="text"
          className="form-control my-2"
          placeholder="Correct Answer"
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answer: e.target.value })
          }
        />
        <button className="btn btn-secondary mb-2" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      {/* Display Added Questions */}
      <div className="mb-4">
        <h5>Added Questions:</h5>
        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul className="list-group">
            {questions.map((q, idx) => (
              <li key={idx} className="list-group-item">
                <strong>Question {idx + 1}:</strong> {q.question}
                <br />
                <em>Answer:</em> {q.answer}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create Quiz Button */}
      <button className="btn btn-primary mt-3" onClick={createQuiz}>
        Create Quiz
      </button>
    </div>
  );
}