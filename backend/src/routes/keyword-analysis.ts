import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getJobDescriptionByCategory, JobDescriptionCategory } from "../mocks/job-descriptions";
import { getBehaviouralKeywords, getJobDescriptionString, getKeywordAnalysisString } from "../utils/util";
import { JobDescription, QuestionAndAnswer } from "../types/mocks";
import type { KeywordAnalysis } from "../types/feedbackSummariser";

export const keywordAnalysisRouter = express.Router();

const getKeywords = async (jobDescription: JobDescription): Promise<string> => {
  const agentId: AgentId = "job-description-keywords-generation";
  const inputString = getJobDescriptionString(jobDescription);
  console.log("Sending to keyword generator:", inputString);
  const response = await callAgent(agentId, inputString);
  console.log("Keyword generator response:", response);
  return response;
};

const callKeywordAnalysisAgent = async (keywords: string, qAndA: QuestionAndAnswer): Promise<string> => {
  const agentId: AgentId = "keyword-analysis";
  const inputString = getKeywordAnalysisString(keywords + getBehaviouralKeywords(), qAndA);

  const result = await callAgent(agentId, inputString);
  console.log("Keyword Analysis Result:", result);
  return result;
};

keywordAnalysisRouter.post("/", express.json(), async (req, res) => {
  try {
    const { 
      questionAndAnswer, 
      jobDescriptionCategory = "intern",
      customJobDescription
    }: { 
      questionAndAnswer: QuestionAndAnswer;
      jobDescriptionCategory?: JobDescriptionCategory;
      customJobDescription?: string;
    } = req.body;

    if (!questionAndAnswer || !questionAndAnswer.question || !questionAndAnswer.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }

    let jobDescription: JobDescription;
    
    if (jobDescriptionCategory === "custom" && customJobDescription) {
      // TODO: Implement custom job description processing
      // For now, fall back to default intern job description
      console.log("Custom job description received but not yet implemented:", customJobDescription);
      jobDescription = getJobDescriptionByCategory("intern");
    } else {
      // Handle predefined job descriptions
      jobDescription = getJobDescriptionByCategory(jobDescriptionCategory);
    }
    const keywords = await getKeywords(jobDescription);
    let result = await callKeywordAnalysisAgent(keywords, questionAndAnswer);
    try {
      let parsed: KeywordAnalysis = JSON.parse(result);
      res.status(200).json(parsed);
      return;
    } catch {
      res.status(500).send("Agent did not return valid KeywordAnalysis JSON");
      return;
    }
  } catch (error) {
    console.error("Error in keyword analysis:", error);
    res.status(500).send("Failed to initiate keyword analysis.");
  }
});
