import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";

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
    await callAgent(agentId, inputString);
    res.status(200).send("Response sentiment analysis initiated successfully.");
  } catch (error) {
    console.error("Error in response sentiment analysis:", error);
    res.status(500).send("Failed to initiate response sentiment analysis.");
  }
});
