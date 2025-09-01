import type {
  KeywordAnalysis,
  ResponseContentAnalysis,
  ResponseSentimentAnalysis,
  FeedbackSummary,
  AudioAnalysis,
  VideoAnalysis,
} from "../types/feedbackSummariser";

export interface SentimentModelResult {
  label: string;
  score: number;
}

export interface SentimentModelResponse {
  input: string;
  analysis: SentimentModelResult[][];
}

export interface AnalysisResponse {
  duration_seconds?: number;
  input?: string;
  sentiment?: string;
  sentimentModelResponse?: SentimentModelResponse;
  videoAnalysis?: VideoAnalysis;
  transcription?: string;
  error?: string;
  feedbackSummary: FeedbackSummary;
  agentResults: {
    audioAnalysis: AudioAnalysis;
    keywordAnalysis: KeywordAnalysis;
    responseContent: ResponseContentAnalysis;
    responseSentiment: ResponseSentimentAnalysis;
    videoAnalysis?: VideoAnalysis;
  };
}

export interface QuestionAndAnswer {
  question: string;
  answer: string;
}

export interface KeywordAnalysisRequest {
  questionAndAnswer: QuestionAndAnswer;
  jobDescriptionCategory?: string;
  customJobDescription?: string;
}

// Base URLs for services - these should match the Docker service names
const API_BASE_URLS = {
  transcriber: "http://localhost:8002",
  audioAnalysis: "http://localhost:8000",
  sentimentAnalysis: "http://localhost:8001",
  videoAnalysis: "http://localhost:8003",
  backend: "http://localhost:3000",
};

export async function transcribeRecording(blob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    console.log(
      "Sending transcription request to:",
      `${API_BASE_URLS.transcriber}/transcribe/`
    );

    const transcriptionResponse = await fetch(
      `${API_BASE_URLS.transcriber}/transcribe/`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!transcriptionResponse.ok) {
      const errorText = await transcriptionResponse.text();
      throw new Error(
        `Transcription failed: ${transcriptionResponse.status} ${transcriptionResponse.statusText} - ${errorText}`
      );
    }

    const transcriptionText = await transcriptionResponse.text();
    console.log("Transcription result:", transcriptionText);
    return transcriptionText;
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
}

export async function analyseAudio(
  blob: Blob,
  transcription: string
): Promise<{ result: AudioAnalysis }> {
  const audioFormData = new FormData();
  audioFormData.append("file", blob, "recording.webm");
  audioFormData.append("transcription", transcription);
  const response = await fetch(
    `${API_BASE_URLS.audioAnalysis}/analyse-audio/`,
    {
      method: "POST",
      body: audioFormData,
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Audio analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  return response.json();
}

export async function analyseKeyword(
  question: string,
  answer: string,
  jobDescriptionCategory?: string,
  customJobDescription?: string
): Promise<{ result: KeywordAnalysis }> {
  const questionAndAnswer = { question, answer };
  const requestBody: KeywordAnalysisRequest = { questionAndAnswer };
  
  if (jobDescriptionCategory) {
    requestBody.jobDescriptionCategory = jobDescriptionCategory;
  }
  
  if (customJobDescription) {
    requestBody.customJobDescription = customJobDescription;
  }
  
  const response = await fetch(`${API_BASE_URLS.backend}/keyword-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Keyword analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const json = await response.json();
  console.log("Keyword Analysis Result:", json);
  return json;
}

export interface JobDescriptionResult {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export async function convertJobSummary(
  customJobDescription: string
): Promise<{ result: JobDescriptionResult }> {
  const response = await fetch(`${API_BASE_URLS.backend}/job-summary-conversion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customJobDescription }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Job summary conversion failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const json = await response.json();
  console.log("Job Summary Conversion Result:", json);
  return json;
}

export async function analyseContent(
  question: string,
  answer: string
): Promise<{ result: ResponseContentAnalysis }> {
  const questionAndAnswer = { question, answer };
  const response = await fetch(`${API_BASE_URLS.backend}/response-content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionAndAnswer),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Response content analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const json = await response.json();
  console.log("Response Content Analysis Result:", json);
  return json;
}

export async function analyseSentiment(
  question: string,
  answer: string
): Promise<{ result: ResponseSentimentAnalysis }> {
  const response = await fetch(`${API_BASE_URLS.backend}/response-sentiment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Response sentiment analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const json = await response.json();
  console.log("Response Sentiment Analysis Result:", json);
  return json;
}

export async function analyseSentimentModel(
  question: string,
  answer: string
): Promise<SentimentModelResponse> {
  const response = await fetch(
    `${API_BASE_URLS.sentimentAnalysis}/sentiment-analysis`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Sentiment model analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const json = await response.json();
  console.log("Sentiment Model Analysis Result:", json);
  return json;
}

export async function analyseVideo(
  blob: Blob
): Promise<VideoAnalysis> {
  const videoFormData = new FormData();
  videoFormData.append("file", blob, "recording.webm");
  const response = await fetch(
    `${API_BASE_URLS.videoAnalysis}/analyse-video/`,
    {
      method: "POST",
      body: videoFormData,
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Video analysis failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  return response.json();
}

export async function summariseFeedback(
  audioAnalysis: AudioAnalysis,
  keywordAnalysis: KeywordAnalysis,
  responseContentAnalysis: ResponseContentAnalysis,
  responseSentimentAnalysis: ResponseSentimentAnalysis,
  videoAnalysis: VideoAnalysis
): Promise<FeedbackSummary> {
  const response = await fetch(`${API_BASE_URLS.backend}/feedback-summariser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      audioAnalysis,
      keywordAnalysis,
      responseContentAnalysis,
      responseSentimentAnalysis,
      videoAnalysis,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Feedback summariser failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  const feedbackSummariserResult = await response.json();
  return feedbackSummariserResult;
}
