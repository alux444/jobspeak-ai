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

export async function uploadRecording(blob: Blob): Promise<AnalysisResponse> {
  try {
    // Step 1: Upload to transcriber service first
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

    // Step 2: Upload to audio analysis service
    const audioFormData = new FormData();
    audioFormData.append("file", blob, "recording.webm");

    const audioAnalysisResponse = await fetch("http://localhost:8000/analyse-audio/", {
      method: "POST",
      body: audioFormData,
    });

    if (!audioAnalysisResponse.ok) {
      throw new Error(`Audio analysis failed: ${audioAnalysisResponse.statusText}`);
    }

    const audioResults = await audioAnalysisResponse.json();

    // Step 3: Send the transcription to sentiment analysis
    const sentimentResponse = await fetch("http://localhost:8001/sentiment-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "Tell me about yourself", // This would need to be dynamic in a real implementation
        answer: transcriptionText,
      }),
    });

    if (!sentimentResponse.ok) {
      throw new Error(`Sentiment analysis failed: ${sentimentResponse.statusText}`);
    }

    const sentimentResults = await sentimentResponse.json();

    // // Step 4: Call the backend Express routes for Azure AI analysis
    // const contentAnalysisResponse = await fetch("http://localhost:3000/response-content", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     question: "Tell me about yourself", // This would need to be dynamic
    //     answer: transcriptionText,
    //   }),
    // });

    // const sentimentCloudResponse = await fetch("http://localhost:3000/response-sentiment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     question: "Tell me about yourself", // This would need to be dynamic
    //     answer: transcriptionText,
    //   }),
    // });

    // Combine all results
    return {
      results: audioResults.results,
      sentiment: sentimentResults,
      transcription: transcriptionText,
      // Note: The backend Express endpoints don't return results directly
      // They initiate background analysis
    };
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
