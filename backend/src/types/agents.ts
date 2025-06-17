import "dotenv/config";

const agentIds = {
  "response-content-analysis": process.env.AZURE_AI_FOUNDRY_RESPONSE_CONTENT_ANALYSIS_AGENT_ID || "",
  "response-sentiment-analysis": process.env.AZURE_AI_FOUNDRY_RESPONSE_SENTIMENT_ANALYSIS_AGENT_ID || "",
  "job-description-keywords-generation": process.env.AZURE_AI_FOUNDRY_JOB_DESCRIPTION_KEYWORDS_GENERATION_AGENT_ID || "",
  "keyword-analysis": process.env.AZURE_AI_FOUNDRY_KEYWORD_ANALYSIS_AGENT_ID || "",
};

export type AgentId = keyof typeof agentIds;

export const getAgentId = (agentId: AgentId): string => {
  const id = agentIds[agentId];
  if (!id) {
    throw new Error(`Agent ID for ${agentId} not found`);
  }
  return id;
};
