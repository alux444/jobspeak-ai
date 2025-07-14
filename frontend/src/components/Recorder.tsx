import React, { useMemo, useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import Controls from "./Controls";
import VideoPreview from "./VideoPreview";
import TranscriptionEditor from "./TranscriptionEditor";
import AnalysisResults from "./AnalysisResults";
import StatusMessages from "./StatusMessages";
import QuestionPrompt from "./QuestionPrompt";
import type { Question } from "../data/questions";

const Recorder: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  const {
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
    handleTranscriptionEdit,
    handleTranscriptionSubmit,
    handleTranscriptionCancel,
  } = useRecorder();

  // Memoize the playback URL so it doesn't get recreated on every render
  const playbackUrl = useMemo(() => {
    if (recordedChunks.length > 0) {
      return URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }));
    }
    return null;
  }, [recordedChunks]);

  return (
    <div className="recorder-container">
      <QuestionPrompt onQuestionChange={setCurrentQuestion} />
      
      <Controls
        recording={recording}
        recordedChunks={recordedChunks}
        isProcessing={isProcessing}
        isTranscribing={isTranscribing}
        showTranscription={showTranscription}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSaveRecording={saveRecording}
        onTranscribeRecording={transcribeRecording}
      />

      {/* Always show the live video preview */}
      <VideoPreview stream={stream} />

      {/* Show playback video if a recording exists and not currently recording */}
      {playbackUrl && !recording && (
        <div className="playback-video" style={{ margin: '20px 0' }}>
          <h4>Playback</h4>
          <video src={playbackUrl} controls style={{ width: 400 }} />
        </div>
      )}

      <StatusMessages
        isTranscribing={isTranscribing}
        isProcessing={isProcessing}
        error={error}
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
    </div>
  );
};

export default Recorder;
