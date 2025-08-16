import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RefreshCw } from 'lucide-react';
import QuestionPrompt from './QuestionPrompt';
import { getRandomQuestion, type Question } from '@/data/questions';
import type { JobDescriptionCategory } from '@/types/jobDescriptions';
import { useRecorder } from '@/hooks/useRecorder';
import AnalysisResults from './AnalysisResults';
import StatusMessages from './StatusMessages';
import TranscriptionEditor from './TranscriptionEditor';
import AnalysisProgress from './AnalysisProgress';
import Nav from './Nav';
import InterviewRecorder from './InterviewRecorder';
import TargetRole from './TargetRole';

export function InterviewAnalyser() {
  const [selectedJobDescription, setSelectedJobDescription] = useState<JobDescriptionCategory>('java-developer');
  const [customJobDescription, setCustomJobDescription] = useState<string | undefined>(undefined);

  const [question, setQuestion] = useState<Question | null>(null);
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
  } = useRecorder(question, selectedJobDescription, customJobDescription);

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
        <div className="w-2xl bg-sidebar-bg border-r border-sidebar-border shadow-soft flex flex-col overflow-hidden h-full">
          <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Interview Question Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground select-none ">
                  Interview Question
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshQuestion}
                  className="hover:bg-primary/10 cursor-pointer"
                  aria-label="Refresh question"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <QuestionPrompt question={question} />
            </div>

            <Separator />

            {/* Target Role Section */}
            <TargetRole
              selectedJobDescription={selectedJobDescription}
              setSelectedJobDescription={setSelectedJobDescription}
              setCustomJobDescription={setCustomJobDescription}
            />
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 space-y-6 h-full overflow-auto">
            {/* Video Preview / Playback / Placeholder */}
            <div className="space-y-4">
              <InterviewRecorder
                stream={stream}
                recordedChunks={recordedChunks}
                uploadedFile={uploadedFile}
                recording={recording}
                isProcessing={isProcessing}
                isTranscribing={isTranscribing}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onFileUpload={handleFileUpload}
                onClearUploadedFile={clearUploadedFile}
                onTranscribe={transcribeRecording}
                onSave={saveRecording}
              />
            </div>

            {/* Status */}
            <StatusMessages
              isTranscribing={isTranscribing}
              isProcessing={isProcessing}
              error={error}
            />
            {/* Transcription Editor */}
            {!showTranscription && (
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