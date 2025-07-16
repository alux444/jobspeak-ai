import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import type { FeedbackSummariserInput } from "../types/feedbackSummariser";

export const feedbackSummariserRouter = express.Router();

// Expected input: { keywordAnalysis, responseContentAnalysis, responseSentimentAnalysis }
feedbackSummariserRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "feedback-summariser";
    const { keywordAnalysis, responseContentAnalysis, responseSentimentAnalysis } = req.body as FeedbackSummariserInput;

    // Validate input structure
    if (!keywordAnalysis || !responseContentAnalysis || !responseSentimentAnalysis) {
      res.status(400).send("Missing required analysis data in request body");
      return;
    }

    // Compose the input string for the agent
    const inputString = `Keyword Analysis: ${JSON.stringify(keywordAnalysis, null, 2)}\n\nResponse Content Analysis: ${JSON.stringify(responseContentAnalysis, null, 2)}\n\nResponse Sentiment Analysis: ${JSON.stringify(responseSentimentAnalysis, null, 2)}`;
    const result = await callAgent(agentId, inputString);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error in feedback summariser:", error);
    res.status(500).send("Failed to initiate feedback summariser.");
  }
}); 