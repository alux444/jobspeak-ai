import { QuestionAndAnswer } from "./types/mocks";

export const getInputString = (value: QuestionAndAnswer): string => {
  return `Q - ${value.question}\n\nA - ${value.answer}\n\n`;
};
