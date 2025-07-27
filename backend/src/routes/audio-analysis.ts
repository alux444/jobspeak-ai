import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { getInputString } from "../utils/util";
import { QuestionAndAnswer } from "../types/mocks";
import type { AudioAnalysis } from "../types/feedbackSummariser";

export const audioAnalysisRouter = express.Router();

audioAnalysisRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "audio-analysis";
    const qAndA: QuestionAndAnswer = req.body;

    if (!qAndA || !qAndA.question || !qAndA.answer) {
      res.status(400).send("Missing required questionAndAnswer data in request body");
      return;
    }

    const inputString = getInputString(qAndA);
    let result = await callAgent(agentId, inputString);
    console.log("Agent response:", result);
    
    try {
      const parsed: { result: AudioAnalysis } = JSON.parse(result);
      console.log("Parsed AudioAnalysis:", parsed.result);
      res.status(200).json(parsed);
      return;
    } catch {
      res.status(500).send("Agent did not return valid AudioAnalysis JSON");
      return;
    }
  } catch (error) {
    console.error("Error in audio analysis:", error);
    res.status(500).send("Failed to initiate audio analysis.");
  }
});