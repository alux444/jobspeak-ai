import express from "express";
import { callAgent } from "../utils/call-agent";
import { AgentId } from "../types/agents";
import { JobDescription } from "../types/mocks";

export const jobSummaryConversionRouter = express.Router();

jobSummaryConversionRouter.post("/", express.json(), async (req, res) => {
  try {
    const { customJobDescription }: { customJobDescription: string } = req.body;
    
    if (!customJobDescription || customJobDescription.trim() === "") {
      res.status(400).send("Missing required customJobDescription in request body");
      return;
    }

    const agentId: AgentId = "job-summary-conversion";
    console.log("Converting job description:", customJobDescription);
    
    const response = await callAgent(agentId, customJobDescription);
    console.log("Job summary conversion response:", response);
    
    try {
      const parsedJobDescription: JobDescription = JSON.parse(response);
      res.status(200).json({ result: parsedJobDescription });
      return;
    } catch (parseError) {
      console.error("Failed to parse job description from agent response:", parseError);
      res.status(500).send("Job summary conversion agent did not return valid JSON");
      return;
    }
  } catch (error) {
    console.error("Error in job summary conversion:", error);
    res.status(500).send("Failed to convert job description");
  }
});
