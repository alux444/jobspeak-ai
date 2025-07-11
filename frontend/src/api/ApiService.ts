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
  transcription?: string;
  error?: string;
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

export async function analyzeRecording(blob: Blob, transcriptionText: string): Promise<AnalysisResponse> {
  try {
    // Prepare form data for audio analysis with transcription
    const audioFormData = new FormData();
    audioFormData.append("file", blob, "recording.webm");
    audioFormData.append("transcription", transcriptionText);

    // Prepare sentiment analysis request
    const sentimentRequest = {
      question: "Tell me about yourself", // This would need to be dynamic in a real implementation
      answer: transcriptionText,
    };

    console.log("Starting parallel analysis requests...");

    // Run both analyses in parallel using Promise.allSettled
    const [audioAnalysisResult, sentimentAnalysisResult] = await Promise.allSettled([
      // Audio analysis
      fetch(`${API_BASE_URLS.audioAnalysis}/analyse-audio/`, {
        method: "POST",
        body: audioFormData,
      }).then((response) => {
        if (!response.ok) {
          return response.text().then(errorText => {
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
          return response.text().then(errorText => {
            throw new Error(`Sentiment analysis failed: ${response.status} ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      }),
    ]);

    // Handle results and collect any errors
    const errors: string[] = [];
    let audioResults = null;
    let sentimentResults = null;

    if (audioAnalysisResult.status === "fulfilled") {
      audioResults = audioAnalysisResult.value;
      console.log("Audio analysis successful:", audioResults);
    } else {
      const errorMsg = audioAnalysisResult.reason.message;
      errors.push(`Audio analysis failed: ${errorMsg}`);
      console.error("Audio analysis failed:", errorMsg);
    }

    if (sentimentAnalysisResult.status === "fulfilled") {
      sentimentResults = sentimentAnalysisResult.value;
      console.log("Sentiment analysis successful:", sentimentResults);
    } else {
      const errorMsg = sentimentAnalysisResult.reason.message;
      errors.push(`Sentiment analysis failed: ${errorMsg}`);
      console.error("Sentiment analysis failed:", errorMsg);
    }

    // If both analyses failed, return error
    if (errors.length === 2) {
      return {
        error: `All analyses failed: ${errors.join("; ")}`,
        transcription: transcriptionText,
      };
    }

    // Return results with any successful analyses
    return {
      results: audioResults?.results || undefined,
      sentiment: sentimentResults || undefined,
      transcription: transcriptionText,
      ...(errors.length > 0 && { error: `Partial failure: ${errors.join("; ")}` }),
    };
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
      transcription: transcriptionText,
    };
  }
}

export async function uploadRecording(blob: Blob): Promise<AnalysisResponse> {
  try {
    // Step 1: Upload to transcriber service first
    const transcriptionText = await transcribeRecording(blob);

    // Step 2: Analyze with the transcription
    return await analyzeRecording(blob, transcriptionText);
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
