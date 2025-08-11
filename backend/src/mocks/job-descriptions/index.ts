import { JobDescription } from "../../types/mocks";
import { internJobDescriptions } from "./intern";
import { javaJobDescriptions } from "./java-developer";
import { businessAnalystJobDescriptions } from "./business-analyst";
import { dataAnalystJobDescriptions } from "./data-analyst";

export type JobDescriptionCategory = "intern" | "java-developer" | "business-analyst" | "data-analyst" | "custom";

type PredefinedJobDescriptionCategory = Exclude<JobDescriptionCategory, "custom">;

export const jobDescriptionCategories: Record<PredefinedJobDescriptionCategory, { label: string; descriptions: JobDescription[] }> = {
  "intern": {
    label: "Software Engineering Intern",
    descriptions: internJobDescriptions
  },
  "java-developer": {
    label: "Java Developer",
    descriptions: javaJobDescriptions
  },
  "business-analyst": {
    label: "Business Analyst", 
    descriptions: businessAnalystJobDescriptions
  },
  "data-analyst": {
    label: "Data Analyst",
    descriptions: dataAnalystJobDescriptions
  }
};

export const getJobDescriptionByCategory = (category: JobDescriptionCategory): JobDescription => {
  if (category === "custom") {
    // Return a placeholder - this should be handled by the caller
    return {
      title: "Custom Position",
      description: "Custom job description",
      responsibilities: [],
      qualifications: []
    };
  }
  return jobDescriptionCategories[category as PredefinedJobDescriptionCategory].descriptions[0];
};

export { internJobDescriptions, javaJobDescriptions, businessAnalystJobDescriptions, dataAnalystJobDescriptions };
