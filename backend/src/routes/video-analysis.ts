import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";
import type { VideoAnalysis } from "../types/feedbackSummariser";

export const videoAnalysisRouter = express.Router();

videoAnalysisRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "video-analysis";
    const qAndA: QuestionAndAnswer = req.body;

    if (!qAndA || !qAndA.question || !qAndA.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }

    const inputString = getInputString(qAndA);
    let result = await callAgent(agentId, inputString);
    
    try {
      const parsed: { result: VideoAnalysis } = JSON.parse(result);
      res.status(200).json(parsed);
      return;
    } catch {
      res.status(500).send("Agent did not return valid VideoAnalysis JSON");
      return;
    }
  } catch (error) {
    console.error("Error in video analysis:", error);
    res.status(500).send("Failed to initiate video analysis.");
  }
});