import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { internJobDescriptions } from "../mocks/job-descriptions/intern";
import { getBehaviouralKeywords, getJobDescriptionString, getKeywordAnalysisString } from "../utils/util";
import { JobDescription, QuestionAndAnswer } from "../types/mocks";
import type { KeywordAnalysis } from "../types/feedbackSummariser";

export const keywordAnalysisRouter = express.Router();

const getKeywords = async (jobDescription: JobDescription): Promise<string> => {
  const agentId: AgentId = "job-description-keywords-generation";
  const inputString = getJobDescriptionString(jobDescription);
  const response = await callAgent(agentId, inputString);
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
    const { questionAndAnswer }: { questionAndAnswer: QuestionAndAnswer } = req.body;

    if (!questionAndAnswer || !questionAndAnswer.question || !questionAndAnswer.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }

    const jobDescription: JobDescription = internJobDescriptions[0];
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
