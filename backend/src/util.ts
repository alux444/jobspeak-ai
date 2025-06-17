import { JobDescription, QuestionAndAnswer } from "./types/mocks";

export const getInputString = (value: QuestionAndAnswer): string => {
  return `Q - ${value.question}\n\nA - ${value.answer}\n\n`;
};

export const getJobDescriptionString = (value: JobDescription): string => {
  return `Title: ${value.title}\n\nDescription: ${value.description}\n\nResponsibilities:\n${value.responsibilities.join("\n")}\n\nQualifications:\n${value.qualifications.join("\n")}\n\n`;
};
