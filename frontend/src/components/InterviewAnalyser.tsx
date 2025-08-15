import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RefreshCw } from 'lucide-react';
import QuestionPrompt from './QuestionPrompt';
import { getRandomQuestion, type Question } from '@/data/questions';
import { JobDescriptionSelector } from './JobDescriptionSelector/JobDescriptionSelector';
import type { JobDescriptionCategory } from '@/types/jobDescriptions';
import { useRecorder } from '@/hooks/useRecorder';
import Controls from './Controls';
import AnalysisResults from './AnalysisResults';
import StatusMessages from './StatusMessages';
import TranscriptionEditor from './TranscriptionEditor';
import VideoContainer from './VideoContainer';
import AnalysisProgress from './AnalysisProgress';
import Nav from './Nav';

export function InterviewAnalyser() {
  const [selectedJobDescription, setSelectedJobDescription] = useState<JobDescriptionCategory>('java-developer');
  const [customJobDescription, setCustomJobDescription] = useState<string | undefined>(undefined);

  const [question, setQuestion] = useState<Question | null>(null);
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

  const refreshQuestion = useCallback(() => {
    setQuestion(getRandomQuestion());
  }, []);

  useEffect(() => {
    refreshQuestion();
  }, [refreshQuestion]);

  return (
    <div className="flex h-screen bg-background transition-colors">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Nav />
      </div>
      <div className="flex w-full h-full pt-[54px]">
        {/* Left Sidebar */}
        <div className="w-lg bg-sidebar-bg border-r border-sidebar-border shadow-soft flex flex-col overflow-hidden h-full">
          <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Target Role Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Target Role</h2>
              <JobDescriptionSelector
                selectedJobDescription={selectedJobDescription}
                setSelectedJobDescription={setSelectedJobDescription}
                setCustomJobDescription={setCustomJobDescription}
              />
            </div>
            <Separator />
            {/* Interview Question Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Interview Question
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshQuestion}
                  className="hover:bg-primary/10"
                  aria-label="Refresh question"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <QuestionPrompt question={question} />
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 space-y-6 h-full overflow-auto">
            {/* Video Preview / Playback / Placeholder */}
            <VideoContainer
              stream={mode === "record" && stream && recording ? stream : undefined}
              src={
                ((mode === "record" && recordedChunks.length > 0 && !recording) ||
                  (mode === "upload" && uploadedFile))
                  ? mode === "record"
                    ? URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }))
                    : uploadedFile
                      ? URL.createObjectURL(uploadedFile)
                      : undefined
                  : undefined
              }
              autoPlay={mode === "record"}
              muted={mode !== "record"}
              controls={((mode === "record" && recordedChunks.length > 0 && !recording) ||
                (mode === "upload" && uploadedFile)) ? true : false}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
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
              </div>

              {recording && (
                <div className="flex items-center space-x-2 text-destructive">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}

              {/* Actions after video is ready */}
              {((mode === "record" && recordedChunks.length > 0 && !recording) ||
                (mode === "upload" && uploadedFile)) &&
                !isProcessing && !showTranscription && (
                  <div className="flex gap-2">
                    {mode === "record" && (
                      <Button variant="outline" onClick={saveRecording} disabled={isTranscribing}>
                        Save Recording
                      </Button>
                    )}
                    <Button onClick={transcribeRecording} disabled={isTranscribing}>
                      Transcribe Recording
                    </Button>
                  </div>
                )}
            </div>

            {/* Status */}
            <StatusMessages
              isTranscribing={isTranscribing}
              isProcessing={isProcessing}
              error={error}
            />
            {/* Transcription Editor */}
            {showTranscription && (
              <TranscriptionEditor
                transcription={transcription}
                isProcessing={isProcessing}
                onTranscriptionEdit={handleTranscriptionEdit}
                onTranscriptionSubmit={handleTranscriptionSubmit}
                onTranscriptionCancel={handleTranscriptionCancel}
              />
            )}
            {/* Analysis Progress */}
            <AnalysisProgress analysisProgress={analysisProgress} />
            {/* Analysis Results */}
            <AnalysisResults analysisResults={analysisResults} />
          </div>
        </div>
      </div>
    </div>
  );
}