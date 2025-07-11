import { useRef, useState } from "react";
import { transcribeRecording as transcribeRecordingApi, analyzeRecording, type AnalysisResponse } from "../api/ApiService";

export const useRecorder = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [showTranscription, setShowTranscription] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
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

  const transcribeRecording = async () => {
    if (recordedChunks.length === 0) return;

    try {
      setIsTranscribing(true);
      setError(null);

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const transcriptionText = await transcribeRecordingApi(blob);
      
      setTranscription(transcriptionText);
      setShowTranscription(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsTranscribing(false);
    }
  };

  const processAnalysis = async () => {
    if (recordedChunks.length === 0 || !transcription) return;

    try {
      setIsProcessing(true);
      setError(null);

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const results = await analyzeRecording(blob, transcription);

      if (results.error) {
        setError(results.error);
      } else {
        setAnalysisResults(results);
        setShowTranscription(false); // Hide transcription after analysis
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranscriptionEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscription(event.target.value);
  };

  const handleTranscriptionSubmit = () => {
    if (transcription.trim()) {
      processAnalysis();
    }
  };

  const handleTranscriptionCancel = () => {
    setShowTranscription(false);
    setTranscription("");
  };

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
      setTranscription("");
      setShowTranscription(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to access camera/microphone");
    }
  };

  return {
    // State
    recording,
    recordedChunks,
    stream,
    isProcessing,
    isTranscribing,
    transcription,
    showTranscription,
    analysisResults,
    error,
    
    // Actions
    startRecording,
    stopRecording,
    saveRecording,
    transcribeRecording,
    processAnalysis,
    handleTranscriptionEdit,
    handleTranscriptionSubmit,
    handleTranscriptionCancel,
  };
};