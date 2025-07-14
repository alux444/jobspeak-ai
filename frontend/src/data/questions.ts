export interface Question {
  id: string;
  text: string;
  category: 'behavioral' | 'situational' | 'leadership' | 'teamwork' | 'problem-solving';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: '1',
    text: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
    category: 'teamwork',
    difficulty: 'medium'
  },
  {
    id: '2',
    text: 'Describe a situation where you had to make a decision without all the information you needed. What was your approach?',
    category: 'problem-solving',
    difficulty: 'hard'
  },
  {
    id: '3',
    text: 'Give me an example of a time when you went above and beyond what was expected of you.',
    category: 'behavioral',
    difficulty: 'easy'
  },
  {
    id: '4',
    text: 'Tell me about a time when you had to lead a team through a challenging project. What was the outcome?',
    category: 'leadership',
    difficulty: 'hard'
  },
  {
    id: '5',
    text: 'Describe a situation where you had to adapt to a significant change at work. How did you handle it?',
    category: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: '6',
    text: 'Tell me about a time when you had to resolve a conflict between team members.',
    category: 'teamwork',
    difficulty: 'medium'
  },
  {
    id: '7',
    text: 'Give me an example of a time when you had to learn something quickly. How did you approach it?',
    category: 'behavioral',
    difficulty: 'easy'
  },
  {
    id: '8',
    text: 'Describe a situation where you had to persuade someone to see things your way. What was your strategy?',
    category: 'leadership',
    difficulty: 'hard'
  },
  {
    id: '9',
    text: 'Tell me about a time when you failed at something. What did you learn from the experience?',
    category: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: '10',
    text: 'Give me an example of a time when you had to prioritize multiple tasks with competing deadlines.',
    category: 'problem-solving',
    difficulty: 'medium'
  },
  {
    id: '11',
    text: 'Describe a situation where you had to work with someone who had a very different personality or work style.',
    category: 'teamwork',
    difficulty: 'medium'
  },
  {
    id: '12',
    text: 'Tell me about a time when you had to take initiative on a project without being asked.',
    category: 'leadership',
    difficulty: 'easy'
  },
  {
    id: '13',
    text: 'Give me an example of a time when you had to solve a complex problem. Walk me through your thought process.',
    category: 'problem-solving',
    difficulty: 'hard'
  },
  {
    id: '14',
    text: 'Describe a situation where you had to give difficult feedback to a colleague. How did you approach it?',
    category: 'leadership',
    difficulty: 'hard'
  },
  {
    id: '15',
    text: 'Tell me about a time when you had to work under pressure. How did you handle the stress?',
    category: 'behavioral',
    difficulty: 'medium'
  }
];

export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

export const getQuestionByCategory = (category: Question['category']): Question => {
  const filteredQuestions = questions.filter(q => q.category === category);
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};

export const getQuestionByDifficulty = (difficulty: Question['difficulty']): Question => {
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
}; 