import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import type { AudioAnalysis } from "../types/feedbackSummariser";

export const audioAnalysisRouter = express.Router();

audioAnalysisRouter.post("/", express.json(), async (req, res) => {
  try {
    const agentId: AgentId = "audio-analysis";
    console.log("Received request for audio analysis:", req.body);

    let result = await callAgent(agentId, req.body);
    try {
      const parsed: { result: AudioAnalysis } = JSON.parse(result);
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
