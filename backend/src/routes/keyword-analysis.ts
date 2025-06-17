import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { internJobDescriptions } from "../mocks/job-descriptions/intern";
import { getBehaviouralKeywords, getJobDescriptionString, getKeywordAnalysisString } from "../utils/util";
import { JobDescription, QuestionAndAnswer } from "../types/mocks";
import { tenValues } from "../mocks/responses/10";
import { zeroValues } from "../mocks/responses/0";

export const keywordAnalysisRouter = express.Router();

const getKeywords = async (jobDescription: JobDescription): Promise<string> => {
  const agentId: AgentId = "job-description-keywords-generation";
  const inputString = getJobDescriptionString(jobDescription);
  const response = await callAgent(agentId, inputString);
  return response;
};

const callKeywordAnalysisAgent = async (keywords: string, qAndA: QuestionAndAnswer): Promise<void> => {
  const agentId: AgentId = "keyword-analysis";
  const inputString = getKeywordAnalysisString(keywords + getBehaviouralKeywords(), qAndA);

  const result = await callAgent(agentId, inputString);
  console.log("Keyword Analysis Result:", result);
};

keywordAnalysisRouter.get("/", async (req, res) => {
  try {
    const jobDescription: JobDescription = internJobDescriptions[0];
    const keywords = await getKeywords(jobDescription);
    const questionAndAnswer: QuestionAndAnswer = zeroValues[2];
    await callKeywordAnalysisAgent(keywords, questionAndAnswer);
    res.status(200).send("Keyword generation initiated successfully.");
  } catch (error) {
    console.error("Error in keyword generation:", error);
    res.status(500).send("Failed to initiate keyword generation.");
  }
});
