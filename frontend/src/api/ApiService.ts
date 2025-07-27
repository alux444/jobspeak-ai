import type { KeywordAnalysis, ResponseContentAnalysis, ResponseSentimentAnalysis, FeedbackSummary, AudioAnalysis } from "../types/feedbackSummariser";

export interface SentimentModelResult {
  label: string;
  score: number;
}

export interface SentimentModelResponse {
  input: string;
  analysis: SentimentModelResult[][];
}

export interface AnalysisResponse {
  results?: {
    [feature: string]: {
      Score: number;
      Feedback: string;
    };
  };
  duration_seconds?: number;
  input?: string;
  sentiment?: string;
  sentimentModelResponse?: SentimentModelResponse;
  transcription?: string;
  error?: string;
  feedbackSummary: FeedbackSummary;
  agentResults: {
    keywordAnalysis: KeywordAnalysis;
    responseContent: ResponseContentAnalysis;
    responseSentiment: ResponseSentimentAnalysis;
  };
}

export interface QuestionAndAnswer {
  question: string;
  answer: string;
}

// Base URLs for services - these should match the Docker service names
const API_BASE_URLS = {
  transcriber: "http://localhost:8002",
  audioAnalysis: "http://localhost:8000",
  sentimentAnalysis: "http://localhost:8001",
  backend: "http://localhost:3000",
};

export async function transcribeRecording(blob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    console.log("Sending transcription request to:", `${API_BASE_URLS.transcriber}/transcribe/`);

    const transcriptionResponse = await fetch(`${API_BASE_URLS.transcriber}/transcribe/`, {
      method: "POST",
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      const errorText = await transcriptionResponse.text();
      throw new Error(`Transcription failed: ${transcriptionResponse.status} ${transcriptionResponse.statusText} - ${errorText}`);
    }

    const transcriptionText = await transcriptionResponse.text();
    console.log("Transcription result:", transcriptionText);
    return transcriptionText;
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
}

export async function analyseAudio(blob: Blob, transcriptionText: string) {
  const audioFormData = new FormData();
  audioFormData.append("file", blob, "recording.webm");
  audioFormData.append("transcription", transcriptionText);
  const response = await fetch(`${API_BASE_URLS.audioAnalysis}/analyse-audio/`, {
    method: "POST",
    body: audioFormData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Audio analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

export async function analyseKeyword(question: string, answer: string): Promise<{ result: KeywordAnalysis }> {
  const questionAndAnswer = { question, answer };
  const response = await fetch(`${API_BASE_URLS.backend}/keyword-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionAndAnswer }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Keyword analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  const json = await response.json();
  console.log("Keyword Analysis Result:", json);
  return json;
}

export async function analyseContent(question: string, answer: string): Promise<{ result: ResponseContentAnalysis }> {
  const questionAndAnswer = { question, answer };
  const response = await fetch(`${API_BASE_URLS.backend}/response-content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionAndAnswer),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Response content analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  const json = await response.json();
  console.log("Response Content Analysis Result:", json);
  return json;
}

export async function analyseSentiment(question: string, answer: string): Promise<{ result: ResponseSentimentAnalysis }> {
  const response = await fetch(`${API_BASE_URLS.backend}/response-sentiment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Response sentiment analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  const json = await response.json();
  console.log("Response Sentiment Analysis Result:", json);
  return json;
}

export async function analyseSentimentModel(question: string, answer: string): Promise<SentimentModelResponse> {
  const response = await fetch(`${API_BASE_URLS.sentimentAnalysis}/sentiment-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sentiment model analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  const json = await response.json();
  console.log("Sentiment Model Analysis Result:", json);
  return json;
}

export async function summariseFeedback(audioAnalysis: AudioAnalysis, keywordAnalysis: KeywordAnalysis, responseContentAnalysis: ResponseContentAnalysis, responseSentimentAnalysis: ResponseSentimentAnalysis): Promise<FeedbackSummary> {
  const response = await fetch(`${API_BASE_URLS.backend}/feedback-summariser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audioAnalysis, keywordAnalysis, responseContentAnalysis, responseSentimentAnalysis }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Feedback summariser failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  const feedbackSummariserResult = await response.json();
  return feedbackSummariserResult;
}
