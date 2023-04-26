import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onQuestionUpdate }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    }).then(() => {
      onQuestionUpdate((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    });
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correctIndex,
      }),
    }).then(() => {
      onQuestionUpdate((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
