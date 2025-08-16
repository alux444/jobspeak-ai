import React from 'react';
import type { Question } from '../data/questions';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { getDifficultyColors } from '@/utils/getDifficultyColours';

interface QuestionPromptProps {
  question: Question | null;
}

const QuestionPrompt: React.FC<QuestionPromptProps> = ({ question }) => {
  if (!question) {
    return (
      <Card
        className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
      >
        <CardContent className="p-4 flex flex-row items-center gap-3">
          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg md:text-xl leading-relaxed">Loading Question...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      key={question.id}
      className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white"
      aria-label="Interview question"
    >
      <CardContent className="p-4 flex flex-col gap-3 animate-fadeIn">
        <p className="text-lg md:text-xl leading-relaxed">{question.text}</p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-white text-black">{question.category}</Badge>
          <Badge
            variant="outline"
            className={`${getDifficultyColors(question.difficulty)}`}
          >
            {question.difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionPrompt;
