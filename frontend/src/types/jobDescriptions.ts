export type JobDescriptionCategory = "intern" | "java-developer" | "business-analyst" | "data-analyst" | "custom";

export interface JobDescriptionOption {
  value: JobDescriptionCategory;
  label: string;
  description: string;
}

export const jobDescriptionOptions: JobDescriptionOption[] = [
  {
    value: "intern",
    label: "Software Engineering Intern",
    description: "Entry-level software development position focusing on learning and assisting with development tasks"
  },
  {
    value: "java-developer", 
    label: "Java Developer",
    description: "Experienced developer working with Java frameworks like Spring Boot and enterprise applications"
  },
  {
    value: "business-analyst",
    label: "Business Analyst", 
    description: "Analyst role focusing on requirements gathering, process improvement, and stakeholder communication"
  },
  {
    value: "data-analyst",
    label: "Data Analyst",
    description: "Analytics role working with data visualization, statistical analysis, and business intelligence"
  }
];
