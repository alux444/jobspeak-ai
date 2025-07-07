import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";
import { tenValues } from "../mocks/responses/10";

export const responseSentimentRouter = express.Router();

responseSentimentRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "response-sentiment-analysis";
    // Use request body if provided, otherwise use mock data
    const qAndA: QuestionAndAnswer = req.body || tenValues[2];
    const inputString = getInputString(qAndA);
    await callAgent(agentId, inputString);
    res.status(200).send("Response sentiment analysis initiated successfully.");
  } catch (error) {
    console.error("Error in response sentiment analysis:", error);
    res.status(500).send("Failed to initiate response sentiment analysis.");
  }
});
