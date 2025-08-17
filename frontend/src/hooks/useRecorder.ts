import { useRef, useState } from "react";
import {
  transcribeRecording as transcribeRecordingApi,
  analyseKeyword,
  analyseContent,
  analyseSentiment,
  analyseSentimentModel,
  analyseVideo,
  summariseFeedback,
  type AnalysisResponse,
  type SentimentModelResponse,
} from "../api/ApiService";
import type { Question } from "../data/questions";
import type {
  KeywordAnalysis,
  ResponseContentAnalysis,
  ResponseSentimentAnalysis,
  FeedbackSummary,
  AudioAnalysis,
  VideoAnalysis,
} from "../types/feedbackSummariser";
import type { JobDescriptionCategory } from "../types/jobDescriptions";

type AnalysisStep =
  | "audio"
  | "video"
  | "keyword"
  | "content"
  | "sentiment_model"
  | "sentiment"
  | "summary";

type StepStatus = "pending" | "in_progress" | "done" | "error";

type AnalysisProgress = Record<AnalysisStep, StepStatus>;

function unwrapResult<T>(res: T | { result: T }): T {
  if (res && typeof res === "object" && "result" in res) {
    return (res as { result: T }).result;
  }
  return res as T;
}

export const useRecorder = (
  currentQuestion: Question | null,
  jobDescriptionCategory?: JobDescriptionCategory,
  customJobDescription?: string
) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analysisAbortControllerRef = useRef<AbortController | null>(null);
  const transcriptionAbortControllerRef = useRef<AbortController | null>(null);

  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"record" | "upload">("record");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [showTranscription, setShowTranscription] = useState(false);
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({
    audio: "pending",
    video: "pending",
    keyword: "pending",
    content: "pending",
    sentiment_model: "pending",
    sentiment: "pending",
    summary: "pending",
  });

  // --- Helpers ---
  const resetState = () => {
    setAnalysisResults(null);
    setError(null);
    setTranscription("");
    setShowTranscription(false);
    setAnalysisProgress({
      audio: "pending",
      video: "pending",
      keyword: "pending",
      content: "pending",
      sentiment_model: "pending",
      sentiment: "pending",
      summary: "pending",
    });
  };

  const getVideoBlob = (): Blob | null => {
    if (mode === "upload" && uploadedFile) return uploadedFile;
    if (mode === "record" && recordedChunks.length > 0)
      return new Blob(recordedChunks, { type: "video/webm" });
    return null;
  };

  // --- Step runner with cancellation awareness ---
  const runStep = async <T>(
    step: AnalysisStep,
    fn: (signal?: AbortSignal) => Promise<T>
  ): Promise<T | null> => {
    const currentStatus = analysisProgress[step];
    if (currentStatus === "done") return null; // skip completed steps

    try {
      setAnalysisProgress((prev) => ({ ...prev, [step]: "in_progress" }));
      const result = await fn(analysisAbortControllerRef.current?.signal);
      if (analysisAbortControllerRef.current?.signal.aborted) {
        setAnalysisProgress((prev) => ({ ...prev, [step]: "cancelled" }));
        return null;
      }
      setAnalysisProgress((prev) => ({ ...prev, [step]: "done" }));
      return unwrapResult<T>(result);
    } catch {
      if (analysisAbortControllerRef.current?.signal.aborted) {
        setAnalysisProgress((prev) => ({ ...prev, [step]: "cancelled" }));
      } else {
        setAnalysisProgress((prev) => ({ ...prev, [step]: "error" }));
      }
      return null;
    }
  };

  // --- Recording functions ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);

      mediaRecorderRef.current = new MediaRecorder(stream);
      setRecordedChunks([]);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0)
          setRecordedChunks((prev) => [...prev, event.data]);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
      resetState();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to access camera/microphone"
      );
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  const saveRecording = () => {
    const blob = getVideoBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setRecordedChunks([]);
    resetState();
  };

  const switchMode = (newMode: "record" | "upload") => {
    setMode(newMode);
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    resetState();
  };

  // --- Transcription functions with cancellation ---
  const transcribeRecording = async () => {
    const videoBlob = getVideoBlob();
    if (!videoBlob) return;

    transcriptionAbortControllerRef.current?.abort();
    const controller = new AbortController();
    transcriptionAbortControllerRef.current = controller;

    try {
      setIsTranscribing(true);
      setError(null);
      const transcriptionText = await transcribeRecordingApi(videoBlob);
      if (controller.signal.aborted) return;
      setTranscription(transcriptionText);
      setShowTranscription(true);
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        setError("Transcription cancelled");
      } else {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTranscriptionEdit = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setTranscription(event.target.value);

  const handleTranscriptionSubmit = () => {
    if (transcription.trim()) processAnalysis();
  };

  const handleTranscriptionCancel = () => {
    setShowTranscription(false);
    setTranscription("");
  };

  // --- Analysis function (parallel, resilient, cancellable, resumable) ---
  const processAnalysis = async () => {
    const videoBlob = getVideoBlob();
    if (!videoBlob || !transcription || !currentQuestion) return;

    analysisAbortControllerRef.current?.abort();
    const controller = new AbortController();
    analysisAbortControllerRef.current = controller;

    setShowTranscription(false);
    setIsProcessing(true);
    setError(null);

    try {
      // Audio & Video
      const audioPromise =
        analysisProgress.audio !== "done"
          ? runStep<AudioAnalysis>("audio", async () =>
              import("../api/ApiService").then(async (api) =>
                unwrapResult<AudioAnalysis>(
                  await api.analyseAudio(videoBlob, transcription)
                )
              )
            )
          : Promise.resolve(
              analysisResults?.agentResults.audioAnalysis || null
            );

      const videoPromise =
        analysisProgress.video !== "done"
          ? runStep<VideoAnalysis>("video", () => analyseVideo(videoBlob))
          : Promise.resolve(
              analysisResults?.agentResults.videoAnalysis || null
            );

      const [audioResults, videoResults] = await Promise.all([
        audioPromise,
        videoPromise,
      ]);

      // Keyword, Content, Sentiment Model, Sentiment
      const keywordPromise =
        analysisProgress.keyword !== "done"
          ? runStep<KeywordAnalysis>("keyword", async () => {
              const result = await analyseKeyword(
                currentQuestion.text,
                transcription,
                jobDescriptionCategory,
                customJobDescription
              );
              return unwrapResult<KeywordAnalysis>(result);
            })
          : Promise.resolve(
              analysisResults?.agentResults.keywordAnalysis || null
            );

      const contentPromise =
        analysisProgress.content !== "done"
          ? runStep<ResponseContentAnalysis>("content", async () => {
              const result = await analyseContent(
                currentQuestion.text,
                transcription
              );
              return unwrapResult<ResponseContentAnalysis>(result);
            })
          : Promise.resolve(
              analysisResults?.agentResults.responseContent || null
            );

      const sentimentModelPromise =
        analysisProgress.sentiment_model !== "done"
          ? runStep<SentimentModelResponse>("sentiment_model", () =>
              analyseSentimentModel(currentQuestion.text, transcription)
            )
          : Promise.resolve(analysisResults?.sentimentModelResponse || null);

      const sentimentPromise =
        analysisProgress.sentiment !== "done"
          ? runStep<ResponseSentimentAnalysis>("sentiment", async () => {
              const result = await analyseSentiment(
                currentQuestion.text,
                transcription
              );
              return unwrapResult<ResponseSentimentAnalysis>(result);
            })
          : Promise.resolve(
              analysisResults?.agentResults.responseSentiment || null
            );

      const [
        keywordResults,
        contentResults,
        sentimentModelResults,
        sentimentResults,
      ] = await Promise.all([
        keywordPromise,
        contentPromise,
        sentimentModelPromise,
        sentimentPromise,
      ]);

      // Feedback summary
      const feedbackSummary =
        analysisProgress.summary !== "done"
          ? await runStep<FeedbackSummary>("summary", () =>
              summariseFeedback(
                audioResults!,
                keywordResults!,
                contentResults!,
                sentimentResults!,
                videoResults!
              )
            )
          : analysisResults?.feedbackSummary || null;

      setAnalysisResults({
        feedbackSummary: feedbackSummary!,
        agentResults: {
          audioAnalysis: audioResults!,
          keywordAnalysis: keywordResults!,
          responseContent: contentResults!,
          responseSentiment: sentimentResults!,
          videoAnalysis: videoResults!,
        },
        sentimentModelResponse: sentimentModelResults || undefined,
        videoAnalysis: videoResults || undefined,
        transcription,
        error: undefined,
      });
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        setError("Analysis cancelled");
      } else {
        const errorMsg =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMsg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelAnalysis = () => {
    analysisAbortControllerRef.current?.abort();
    transcriptionAbortControllerRef.current?.abort();
    setIsProcessing(false);
    setIsTranscribing(false);
    setError("Operation cancelled");
  };

  return {
    recording,
    recordedChunks,
    uploadedFile,
    mode,
    stream,
    isProcessing,
    isTranscribing,
    transcription,
    showTranscription,
    analysisResults,
    error,
    analysisProgress,
    startRecording,
    stopRecording,
    saveRecording,
    transcribeRecording,
    handleTranscriptionEdit,
    handleTranscriptionSubmit,
    handleTranscriptionCancel,
    handleFileUpload,
    switchMode,
    clearUploadedFile,
  };
};
