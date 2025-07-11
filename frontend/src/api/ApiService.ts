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

export async function transcribeRecording(blob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    const transcriptionResponse = await fetch("http://localhost:8002/transcribe/", {
      method: "POST",
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`);
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
    // Prepare form data for audio analysis
    const audioFormData = new FormData();
    audioFormData.append("file", blob, "recording.webm");

    // Prepare sentiment analysis request
    const sentimentRequest = {
      question: "Tell me about yourself", // This would need to be dynamic in a real implementation
      answer: transcriptionText,
    };

    // Run both analyses in parallel using Promise.allSettled
    const [audioAnalysisResult, sentimentAnalysisResult] = await Promise.allSettled([
      // Audio analysis
      fetch("http://localhost:8000/analyse-audio/", {
        method: "POST",
        body: audioFormData,
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Audio analysis failed: ${response.statusText}`);
        }
        return response.json();
      }),

      // Sentiment analysis
      fetch("http://localhost:8001/sentiment-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentimentRequest),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Sentiment analysis failed: ${response.statusText}`);
        }
        return response.json();
      })
    ]);

    // Handle results and collect any errors
    const errors: string[] = [];
    let audioResults = null;
    let sentimentResults = null;

    if (audioAnalysisResult.status === 'fulfilled') {
      audioResults = audioAnalysisResult.value;
    } else {
      errors.push(`Audio analysis failed: ${audioAnalysisResult.reason.message}`);
    }

    if (sentimentAnalysisResult.status === 'fulfilled') {
      sentimentResults = sentimentAnalysisResult.value;
    } else {
      errors.push(`Sentiment analysis failed: ${sentimentAnalysisResult.reason.message}`);
    }

    // If both analyses failed, return error
    if (errors.length === 2) {
      return {
        error: `All analyses failed: ${errors.join('; ')}`,
        transcription: transcriptionText,
      };
    }

    // Return results with any successful analyses
    return {
      results: audioResults?.results || undefined,
      sentiment: sentimentResults || undefined,
      transcription: transcriptionText,
      ...(errors.length > 0 && { error: `Partial failure: ${errors.join('; ')}` }),
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
