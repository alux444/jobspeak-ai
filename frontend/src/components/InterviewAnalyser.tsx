import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, RefreshCw } from 'lucide-react';
import QuestionPrompt from './QuestionPrompt';
import { getRandomQuestion, type Question } from '@/data/questions';
import type { JobDescriptionCategory } from '@/types/jobDescriptions';
import { useRecorder } from '@/hooks/useRecorder';
import AnalysisResults from './AnalysisResults';
import TranscriptionEditor from './TranscriptionEditor';
import AnalysisProgress from './AnalysisProgress';
import Nav from './Nav';
import InterviewRecorder from './InterviewRecorder';
import TargetRole from './TargetRole';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

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
    <div className="flex flex-col h-screen bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Nav />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-[56px] h-full overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-5/12 bg-sidebar-bg border-b md:border-b-0 md:border-r border-sidebar-border shadow-soft flex flex-col">
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Interview Question Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground select-none">
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
        <div className="w-full md:flex-1 flex flex-col overflow-auto">
          <div className="p-4 sm:p-6 space-y-6 flex-1">
            {/* Video Preview / Recorder */}
            <InterviewRecorder
              mode={mode}
              stream={stream}
              recordedChunks={recordedChunks}
              uploadedFile={uploadedFile}
              recording={recording}
              isProcessing={isProcessing}
              isTranscribing={isTranscribing}
              onSwitchMode={switchMode}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onFileUpload={handleFileUpload}
              onClearUploadedFile={clearUploadedFile}
              onTranscribe={transcribeRecording}
              onSave={saveRecording}
            />

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Transcription Editor */}
            {showTranscription && (
              <TranscriptionEditor
                transcription={transcription}
                isProcessing={isProcessing}
                onTranscriptionEdit={handleTranscriptionEdit}
                onTranscriptionSubmit={handleTranscriptionSubmit}
              />
            )}

            {/* Analysis Progress */}
            {isProcessing && <AnalysisProgress analysisProgress={analysisProgress} />}

            {/* Analysis Results */}
            <AnalysisResults analysisResults={analysisResults} />
          </div>
        </div>
      </div>
    </div>

  );
}