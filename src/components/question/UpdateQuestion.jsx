import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="mt-5 text-center" style={{ color: "GrayText" }}>
        {" "}
        Update Quiz Question
      </h2>
      <div className="col-md-8 mx-auto">
        <form onSubmit={handleUpdate}>
          <div className="">
            <label className="form-label">Question:</label>
            <textarea
              className="form-control mb-4"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
            ></textarea>
          </div>
          <div>
            <label className="form-label">Choices:</label>
            {choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                className="form-control mb-4"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>
          <div>
            <label className="form-label">Correct Answer(s):</label>
            <input
              type="text"
              className="form-control mb-4"
              value={
                Array.isArray(correctAnswers)
                  ? correctAnswers.join(", ")
                  : correctAnswers
              }
              onChange={handleCorrectAnswerChange}
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-sm btn-outline-warning ">
              Update question
            </button>
            <Link to={"/all-quizzes"} className="btn btn-outline-primary">
              Back to all questions
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
