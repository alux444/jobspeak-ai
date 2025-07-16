export interface FeedbackSummary {
  verdict: string;
  strengths: string;
  weaknesses: string;
  improvement_suggestion: string;
  overall_score: number;
}
export interface AnalysisResponse {
  feedbackSummary?: FeedbackSummary;
  results?: {
    [feature: string]: {
      Score: number;
      Feedback: string;
    };
  };
  duration_seconds?: number;
  input?: string;
  sentiment?: string;
  transcription?: string;
  error?: string;
  agentResults?: {
    keywordAnalysis?: string;
    responseContent?: string;
    responseSentiment?: string;
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

export async function analyzeRecording(blob: Blob, transcriptionText: string, question: string): Promise<AnalysisResponse> {
  try {
    // Prepare form data for audio analysis with transcription
    const audioFormData = new FormData();
    audioFormData.append("file", blob, "recording.webm");
    audioFormData.append("transcription", transcriptionText);

    // Prepare sentiment analysis request
    const sentimentRequest = {
      question: question,
      answer: transcriptionText,
    };

    // Prepare agent analysis requests
    const questionAndAnswer: QuestionAndAnswer = {
      question: question,
      answer: transcriptionText,
    };

    console.log("Starting comprehensive analysis requests...");

    // Run all analyses in parallel using Promise.allSettled
    const [keywordAnalysisResult, responseContentResult, responseSentimentResult] = await Promise.allSettled([
      // Audio analysis
      fetch(`${API_BASE_URLS.audioAnalysis}/analyse-audio/`, {
        method: "POST",
        body: audioFormData,
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`Audio analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),

      // Sentiment analysis
      fetch(`${API_BASE_URLS.sentimentAnalysis}/sentiment-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentimentRequest),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`Sentiment analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),

      // Keyword analysis agent
      fetch(`${API_BASE_URLS.backend}/keyword-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionAndAnswer }),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`Keyword analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),

      // Response content analysis agent
      fetch(`${API_BASE_URLS.backend}/response-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionAndAnswer),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`Response content analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),

      // Response sentiment analysis agent
      fetch(`${API_BASE_URLS.backend}/response-sentiment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionAndAnswer),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`Response sentiment analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),
    ]);

    // Extract and parse agent results
    function tryParseJSON(str: string) {
      try {
        return JSON.parse(str);
      } catch {
        return str;
      }
    }

    const keywordAnalysis = keywordAnalysisResult.status === "fulfilled" ? tryParseJSON(keywordAnalysisResult.value.results) : null;
    const responseContentAnalysis = responseContentResult.status === "fulfilled" ? responseContentResult.value : null;
    const responseSentimentAnalysis = responseSentimentResult.status === "fulfilled" ? tryParseJSON(responseSentimentResult.value.result) : null;

    console.log("KeywordAnalysis", keywordAnalysisResult);
    console.log("ResponseContentAnalysis", responseContentResult);
    console.log("ResponseSentimentAnalysis", responseSentimentResult);

    // Call feedback summariser with all required inputs
    const feedbackSummariserResponse = await fetch(`${API_BASE_URLS.backend}/feedback-summariser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywordAnalysis,
        responseContentAnalysis,
        responseSentimentAnalysis,
      }),
    });

    if (!feedbackSummariserResponse.ok) {
      const errorText = await feedbackSummariserResponse.text();
      throw new Error(`Feedback summariser failed: ${feedbackSummariserResponse.status} ${feedbackSummariserResponse.statusText} - ${errorText}`);
    }

    console.log("FeedbackSummariserResponse", feedbackSummariserResponse);
    const feedbackSummariserResult = await feedbackSummariserResponse.json();
    let feedbackSummary = feedbackSummariserResult.result;
    if (typeof feedbackSummary === "string") {
      try {
        feedbackSummary = JSON.parse(feedbackSummary);
      } catch {
        // leave as string if parsing fails
      }
    }
    return {
      feedbackSummary,
    };
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
      transcription: transcriptionText,
    };
  }
}

export async function uploadRecording(blob: Blob, question: string): Promise<AnalysisResponse> {
  try {
    // Step 1: Upload to transcriber service first
    const transcriptionText = await transcribeRecording(blob);

    // Step 2: Analyze with the transcription and question
    return await analyzeRecording(blob, transcriptionText, question);
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
