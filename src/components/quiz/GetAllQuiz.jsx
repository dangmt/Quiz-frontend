import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: [], choices: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
      setIsQuestionDeleted(true);
      setDeleteSuccess("Question deleted successfully.");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setDeleteSuccess("");
    }, 4000);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="container">
      <div className="row mt-5">
        <div className="col-md-6 mb-2 mb-md-0" style={{ color: "GrayText" }}>
          <h2>All Quiz Questions</h2>
        </div>
        <div className="col-md-4 text-end">
          <Link to={"/create-quiz"}>
            <FaPlus /> Add Question
          </Link>
        </div>
      </div>
      <hr></hr>
      {isQuestionDeleted && (
        <div className="alert alert-success">{deleteSuccess}</div>
      )}
      {/* <div className="alert alert-success">Question deleted successfully.</div> */}

      {questions.map((question, index) => (
        <div key={question.id}>
          <pre>
            <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${
              question.question
            }`}</h4>
          </pre>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
          <p className="text-success">
            Correct Answer(s): {question.correctAnswers.join(", ")}
          </p>
          <div className="btn-group mb-4">
            <Link
              to={`/update-quiz/${question.id}`}
              className="btn btn-sm btn-outline-warning"
            >
              Edit Question
            </Link>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              Delete Question
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GetAllQuiz;
