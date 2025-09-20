import { JobDescription } from "../../types/mocks";
import { internJobDescriptions } from "./intern";
import { javaJobDescriptions } from "./java-developer";
import { businessAnalystJobDescriptions } from "./business-analyst";
import { dataAnalystJobDescriptions } from "./data-analyst";
import { softwareEngineerJobDescriptions } from "./software-engineer";
import { civilEngineerJobDescriptions } from "./civil-engineer";
import { mechatronicsEngineerJobDescriptions } from "./mechatronics-engineer";
import { cybersecurityAnalystJobDescriptions } from "./cybersecurity-analyst";
import { mlEngineerJobDescriptions } from "./ml-engineer";
import { cloudArchitectJobDescriptions } from "./cloud-architect";
import { structuralEngineerJobDescriptions } from "./structural-engineer";
import { electricalEngineerJobDescriptions } from "./electrical-engineer";
import { aiResearcherJobDescriptions } from "./ai-researcher";
import { firmwareEngineerJobDescriptions } from "./firmware-engineer";

export type JobDescriptionCategory =
  | "custom"
  | "intern"
  | "software-engineer"
  | "java-developer"
  | "business-analyst"
  | "data-analyst"
  | "civil-engineer"
  | "mechatronics-engineer"
  | "cybersecurity-analyst"
  | "ml-engineer"
  | "cloud-architect"
  | "structural-engineer"
  | "electrical-engineer"
  | "ai-researcher"
  | "firmware-engineer";

type PredefinedJobDescriptionCategory = Exclude<
  JobDescriptionCategory,
  "custom"
>;

const jobDescriptionCategories: Record<
  PredefinedJobDescriptionCategory,
  { label: string; descriptions: JobDescription[] }
> = {
  intern: {
    label: "Intern/Entry Level",
    descriptions: internJobDescriptions,
  },
  "software-engineer": {
    label: "Full-Stack Software Engineer",
    descriptions: softwareEngineerJobDescriptions,
  },
  "java-developer": {
    label: "Java Developer",
    descriptions: javaJobDescriptions,
  },
  "business-analyst": {
    label: "Business Analyst",
    descriptions: businessAnalystJobDescriptions,
  },
  "data-analyst": {
    label: "Data Analyst",
    descriptions: dataAnalystJobDescriptions,
  },
  "civil-engineer": {
    label: "Civil Engineer",
    descriptions: civilEngineerJobDescriptions,
  },
  "mechatronics-engineer": {
    label: "Mechatronics Engineer",
    descriptions: mechatronicsEngineerJobDescriptions,
  },
  "cybersecurity-analyst": {
    label: "Cybersecurity Analyst",
    descriptions: cybersecurityAnalystJobDescriptions,
  },
  "ml-engineer": {
    label: "Machine Learning Engineer",
    descriptions: mlEngineerJobDescriptions,
  },
  "cloud-architect": {
    label: "Cloud Architect",
    descriptions: cloudArchitectJobDescriptions,
  },
  "structural-engineer": {
    label: "Structural Engineer",
    descriptions: structuralEngineerJobDescriptions,
  },
  "electrical-engineer": {
    label: "Electrical Engineer",
    descriptions: electricalEngineerJobDescriptions,
  },
  "ai-researcher": {
    label: "AI Researcher",
    descriptions: aiResearcherJobDescriptions,
  },
  "firmware-engineer": {
    label: "Firmware Engineer",
    descriptions: firmwareEngineerJobDescriptions,
  },
};

export const getJobDescriptionByCategory = (
  category: JobDescriptionCategory
): JobDescription => {
  if (category === "custom") {
    // Return a placeholder - this should be handled by the caller
    return {
      title: "Custom Position",
      description: "Custom job description",
      responsibilities: [],
      qualifications: [],
    };
  }
  return jobDescriptionCategories[category as PredefinedJobDescriptionCategory]
    .descriptions[0];
};

export {
  internJobDescriptions,
  javaJobDescriptions,
  businessAnalystJobDescriptions,
  dataAnalystJobDescriptions,
};
