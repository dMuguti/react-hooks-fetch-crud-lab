import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleQuestionUpdate = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm onQuestionUpdate={handleQuestionUpdate} />
      ) : (
        <QuestionList questions={questions} onQuestionUpdate={handleQuestionUpdate} />
      )}
    </main>
  );
}

export default App;
