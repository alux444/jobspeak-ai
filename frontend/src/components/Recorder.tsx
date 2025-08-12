import React, { useMemo, useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import Controls from "./Controls";
import VideoPreview from "./VideoPreview";
import TranscriptionEditor from "./TranscriptionEditor";
import AnalysisResults from "./AnalysisResults";
import StatusMessages from "./StatusMessages";
import QuestionPrompt from "./QuestionPrompt";
import { JobDescriptionSelector } from "./JobDescriptionSelector/JobDescriptionSelector";
import type { Question } from "../data/questions";
import type { JobDescriptionCategory } from "../types/jobDescriptions";

const Recorder: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedJobDescription, setSelectedJobDescription] = useState<JobDescriptionCategory>('java-developer');
  const [customJobDescription, setCustomJobDescription] = useState<string | undefined>(undefined);

  const handleJobDescriptionChange = (category: JobDescriptionCategory, customDescription?: string) => {
    setSelectedJobDescription(category);
    setCustomJobDescription(customDescription);
  };
  
  const {
    // State
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
    // Actions
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

  // Memoize the playback URL for recorded video
  const recordedPlaybackUrl = useMemo(() => {
    if (recordedChunks.length > 0) {
      return URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }));
    }
    return null;
  }, [recordedChunks]);

  // Memoize the playback URL for uploaded video
  const uploadedPlaybackUrl = useMemo(() => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    return null;
  }, [uploadedFile]);

  return (
    <div className="recorder-container">
      <JobDescriptionSelector 
        selectedJobDescription={selectedJobDescription}
        onJobDescriptionChange={handleJobDescriptionChange}
      />      <QuestionPrompt 
        onQuestionChange={setCurrentQuestion} 
      />
      
      <Controls
        recording={recording}
        recordedChunks={recordedChunks}
        uploadedFile={uploadedFile}
        mode={mode}
        isProcessing={isProcessing}
        isTranscribing={isTranscribing}
        showTranscription={showTranscription}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSaveRecording={saveRecording}
        onTranscribeRecording={transcribeRecording}
        onFileUpload={handleFileUpload}
        onSwitchMode={switchMode}
        onClearUploadedFile={clearUploadedFile}
      />

      {/* Live video preview - only show in record mode */}
      {mode === "record" && <VideoPreview stream={stream} />}

      {/* Video playback section */}
      {((mode === "record" && recordedPlaybackUrl && !recording) || 
        (mode === "upload" && uploadedPlaybackUrl)) && (
        <div className="playback-video" style={{ margin: '20px 0' }}>
          <h4>
            {mode === "record" ? "Recorded Video" : "Uploaded Video"}
            {uploadedFile && mode === "upload" && (
              <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
                ({uploadedFile.name})
              </span>
            )}
          </h4>
          <video 
            src={mode === "record" ? recordedPlaybackUrl || undefined : uploadedPlaybackUrl || undefined} 
            controls 
            style={{ width: 400, maxWidth: '100%' }} 
          />
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
    </div>
  );
};

export default Recorder;
