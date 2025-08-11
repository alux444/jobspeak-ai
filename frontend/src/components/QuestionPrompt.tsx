import React, { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';
import type { Question } from '../data/questions';

interface QuestionPromptProps {
  onQuestionChange?: (question: Question) => void;
}

const QuestionPrompt: React.FC<QuestionPromptProps> = ({ 
  onQuestionChange
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const loadNewQuestion = () => {
    const newQuestion = getRandomQuestion();
    setCurrentQuestion(newQuestion);
    onQuestionChange?.(newQuestion);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshQuestion = () => {
    loadNewQuestion();
  };

  if (!currentQuestion) {
    return <div className="question-prompt loading">Loading question...</div>;
  }

  return (
    <div className="question-prompt">
      <div className="question-header">
        <h3>Your Interview Question</h3>
        <button 
          onClick={handleRefreshQuestion}
          className="refresh-button"
          title="Get a new question"
        >
          🔄 New Question
        </button>
      </div>

      <div className="question-content">
        <p className="question-text">{currentQuestion.text}</p>
        <div className="question-meta">
          <span className="question-category">{currentQuestion.category}</span>
          <span className="question-difficulty">{currentQuestion.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPrompt; 