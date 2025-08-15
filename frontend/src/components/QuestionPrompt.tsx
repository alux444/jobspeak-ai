import React from 'react';
import type { Question } from '../data/questions';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface QuestionPromptProps {
  question: Question | null;
}

const QuestionPrompt: React.FC<QuestionPromptProps> = ({ question }) => {
  if (!question) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-muted-foreground animate-fadeIn"
        role="status"
        aria-live="polite"
      >
        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Loading question...
      </div>
    );
  }

  return (
    <Card
      className="border-primary/20 bg-gradient-primary text-black animate-fadeIn"
      aria-label="Interview question"
    >
      <CardContent className="p-4 flex flex-col gap-3">
        <p className="text-sm leading-relaxed">{question.text}</p>
        <div className="flex gap-2 flex-wrap">
          <Badge>{question.category}</Badge>
          <Badge variant="outline">{question.difficulty}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionPrompt;
