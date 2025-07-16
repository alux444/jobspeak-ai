import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";
import type { ResponseContentAnalysis } from "../types/feedbackSummariser";

export const responseContentRouter = express.Router();

responseContentRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "response-content-analysis";
    const qAndA: QuestionAndAnswer = req.body;
    
    if (!qAndA || !qAndA.question || !qAndA.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }
    
    const inputString = getInputString(qAndA);
    let result = await callAgent(agentId, inputString);
    try {
      const parsed: { result: ResponseContentAnalysis } = JSON.parse(result);
      res.status(200).json(parsed);
      return;
    } catch {
      res.status(500).send("Agent did not return valid ResponseContentAnalysis JSON");
      return;
    }
  } catch (error) {
    console.error("Error in response content analysis:", error);
    res.status(500).send("Failed to initiate response content analysis.");
  }
});
