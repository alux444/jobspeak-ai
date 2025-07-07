import React, { useRef, useEffect, useState } from "react";
import { uploadRecording, type AnalysisResponse } from "../api/ApiService";

const Recorder: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  const processRecording = async () => {
    if (recordedChunks.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const results = await uploadRecording(blob);

      if (results.error) {
        setError(results.error);
      } else {
        setAnalysisResults(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setStream(stream);
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      // Reset previous results when starting a new recording
      setAnalysisResults(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to access camera/microphone");
    }
  };

  // Helper to render the analysis results
  const renderAnalysisResults = () => {
    if (!analysisResults) return null;

    return (
      <div className="analysis-results">
        <h3>Analysis Results</h3>

        {analysisResults?.results && (
          <div className="audio-analysis">
            <h4>Audio Analysis</h4>
            {Object.entries(analysisResults.results).map(([feature, data]: [string, { Score: number; Feedback: string }]) => (
              <div key={feature} className="feature">
                <h5>{feature}</h5>
                <p>Score: {data.Score}/10</p>
                <p>Feedback: {data.Feedback}</p>
              </div>
            ))}
          </div>
        )}

        {analysisResults?.sentiment && (
          <div className="sentiment-analysis">
            <h4>Sentiment Analysis</h4>
            <pre>{JSON.stringify(analysisResults.sentiment, null, 2)}</pre>
          </div>
        )}

        {analysisResults?.transcription && (
          <div className="transcription">
            <h4>Transcription</h4>
            <p>{analysisResults.transcription}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="recorder-container">
      <div className="controls">
        <button onClick={recording ? stopRecording : startRecording} disabled={isProcessing}>
          {recording ? "Stop Recording" : "Start Recording"}
        </button>

        {recordedChunks.length > 0 && !isProcessing && (
          <>
            <button onClick={saveRecording}>Save Recording</button>
            <button onClick={processRecording}>Analyze Recording</button>
          </>
        )}
      </div>

      {stream && (
        <div className="video-preview">
          <video ref={videoRef} autoPlay muted style={{ width: 400, marginTop: 16 }} />
        </div>
      )}

      {isProcessing && <div className="processing">Processing your recording...</div>}

      {error && <div className="error">Error: {error}</div>}

      {renderAnalysisResults()}
    </div>
  );
};

export default Recorder;
