import React, { useMemo, useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import Controls from "./ActionButtons";
import VideoPreview from "./InterviewRecorder";
import TranscriptionEditor from "./TranscriptionEditor";
import AnalysisResults from "./AnalysisResults";
import StatusMessages from "./StatusMessages";
import type { Question } from "../data/questions";
import type { JobDescriptionCategory } from "../types/jobDescriptions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface RecorderProps {
  selectedJobDescription: JobDescriptionCategory;
  customJobDescription: string | undefined;
}

const Recorder: React.FC<RecorderProps> = ({ selectedJobDescription, customJobDescription }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const {
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
  } = useRecorder(currentQuestion, selectedJobDescription, customJobDescription);

  const recordedPlaybackUrl = useMemo(() => {
    if (recordedChunks.length > 0) {
      return URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }));
    }
    return null;
  }, [recordedChunks]);

  const uploadedPlaybackUrl = useMemo(() => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    return null;
  }, [uploadedFile]);

  const hasVideoContent = (mode === "record" && recordedChunks.length > 0) ||
    (mode === "upload" && uploadedFile);

  return (
    <Card className="recorder-container max-w-xl mx-auto mt-8">
      <CardHeader>
        <Controls
          recording={recording}
          uploadedFile={uploadedFile}
          mode={mode}
          isProcessing={isProcessing}
          isTranscribing={isTranscribing}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onFileUpload={handleFileUpload}
          onSwitchMode={switchMode}
          onClearUploadedFile={clearUploadedFile}
        />
      </CardHeader>
      <Separator />
      <CardContent>
        {mode === "record" && <VideoPreview stream={stream} />}

        {((mode === "record" && recordedPlaybackUrl && !recording) ||
          (mode === "upload" && uploadedPlaybackUrl)) && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                {mode === "record" ? "Recorded Video" : "Uploaded Video"}
                {uploadedFile && mode === "upload" && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({uploadedFile.name})
                  </span>
                )}
              </h4>
              <video
                src={mode === "record" ? recordedPlaybackUrl || undefined : uploadedPlaybackUrl || undefined}
                controls
                className="w-full max-w-md rounded-md border"
              />
            </div>
          )}

        {hasVideoContent && !isProcessing && !isTranscribing && !showTranscription && (
          <div className="flex gap-2 mb-4">
            {mode === "record" && (
              <Button variant="outline" onClick={saveRecording}>
                Save Recording
              </Button>
            )}
            <Button onClick={transcribeRecording}>
              Transcribe Recording
            </Button>
          </div>
        )}

        <StatusMessages
          isTranscribing={isTranscribing}
          isProcessing={isProcessing}
          error={error}
          analysisProgress={analysisProgress}
        />

        {showTranscription && (
          <TranscriptionEditor
            transcription={transcription}
            isProcessing={isProcessing}
            onTranscriptionEdit={handleTranscriptionEdit}
            onTranscriptionSubmit={handleTranscriptionSubmit}
            onTranscriptionCancel={handleTranscriptionCancel}
          />
        )}

        <AnalysisResults analysisResults={analysisResults} />
      </CardContent>
    </Card>
  );
};

export default Recorder;
