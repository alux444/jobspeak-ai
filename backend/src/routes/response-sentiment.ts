import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";
import type { ResponseSentimentAnalysis } from "../types/feedbackSummariser";

export const responseSentimentRouter = express.Router();

responseSentimentRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "response-sentiment-analysis";
    const qAndA: QuestionAndAnswer = req.body;
    
    if (!qAndA || !qAndA.question || !qAndA.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }
    
    const inputString = getInputString(qAndA);
    let result = await callAgent(agentId, inputString);
    try {
      const parsed: { result: ResponseSentimentAnalysis } = JSON.parse(result);
      res.status(200).json(parsed);
      return;
    } catch {
      res.status(500).send("Agent did not return valid ResponseSentimentAnalysis JSON");
      return;
    }
  } catch (error) {
    console.error("Error in response sentiment analysis:", error);
    res.status(500).send("Failed to initiate response sentiment analysis.");
  }
});
