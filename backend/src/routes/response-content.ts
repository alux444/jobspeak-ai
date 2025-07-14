import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";

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
    await callAgent(agentId, inputString);
    res.status(200).send("Response content analysis initiated successfully.");
  } catch (error) {
    console.error("Error in response content analysis:", error);
    res.status(500).send("Failed to initiate response content analysis.");
  }
});
