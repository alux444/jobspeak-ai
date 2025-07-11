import React from "react";
import { useRecorder } from "../hooks/useRecorder";
import Controls from "./Controls";
import VideoPreview from "./VideoPreview";
import TranscriptionEditor from "./TranscriptionEditor";
import AnalysisResults from "./AnalysisResults";
import StatusMessages from "./StatusMessages";

const Recorder: React.FC = () => {
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

  return (
    <div className="recorder-container">
      <Controls recording={recording} recordedChunks={recordedChunks} isProcessing={isProcessing} isTranscribing={isTranscribing} showTranscription={showTranscription} onStartRecording={startRecording} onStopRecording={stopRecording} onSaveRecording={saveRecording} onTranscribeRecording={transcribeRecording} />

      <VideoPreview stream={stream} />

      <StatusMessages isTranscribing={isTranscribing} isProcessing={isProcessing} error={error} />

      {showTranscription && <TranscriptionEditor transcription={transcription} isProcessing={isProcessing} onTranscriptionEdit={handleTranscriptionEdit} onTranscriptionSubmit={handleTranscriptionSubmit} onTranscriptionCancel={handleTranscriptionCancel} />}

      <AnalysisResults analysisResults={analysisResults} />
    </div>
  );
};

export default Recorder;
