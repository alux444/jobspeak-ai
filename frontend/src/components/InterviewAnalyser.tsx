import { useCallback, useEffect, useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { Timer } from './Timer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
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
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog';

export function InterviewAnalyser() {
  const [selectedJobDescription, setSelectedJobDescription] = useState<JobDescriptionCategory>('general');
  const [customJobDescription, setCustomJobDescription] = useState<string | undefined>(undefined);

  const [question, setQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [thinkingTime] = useState(() => Number(window.localStorage.getItem('thinkingTime')) || 60);
  const [responseTime] = useState(() => Number(window.localStorage.getItem('responseTime')) || 120);

  const thinkingTimer = useTimer({
    duration: thinkingTime,
    autoStart: false,
    onComplete: () => {
      startRecording();
      responseTimer.start();
    },
  });
  const responseTimer = useTimer({
    duration: responseTime,
    autoStart: false,
    onComplete: () => {
      stopRecording();
    },
  });

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
    resetRecorder,
  } = useRecorder(question, selectedJobDescription, customJobDescription);

  const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);

  const refreshQuestionAndRecorder = useCallback(() => {
    setQuestion(getRandomQuestion());
    setShowQuestion(false);
    thinkingTimer.reset();
    responseTimer.reset();
    resetRecorder();
  }, [thinkingTimer, responseTimer, resetRecorder]);

  const handleRefreshClick = () => {
    setShowConfirmRefresh(true);
  };

  useEffect(() => {
    if (!question) {
      setQuestion(getRandomQuestion());
    }
  }, [question]);

  useEffect(() => {
    if (showQuestion && !recording) {
      thinkingTimer.start();
    } else if (!showQuestion) {
      thinkingTimer.stop();
      thinkingTimer.reset();
      responseTimer.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuestion]);

  // Manual start recording (skips thinking timer)
  const handleManualStartRecording = () => {
    if (thinkingTimer.active) {
      thinkingTimer.stop();
      thinkingTimer.reset();
    }
    setShowQuestion(true);
    startRecording();
    responseTimer.start();
  };

  // Manual stop recording
  const handleManualStopRecording = () => {
    responseTimer.stop();
    stopRecording();
  };

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
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!showQuestion && question) setShowQuestion(true);
                    }}
                    className="hover:bg-primary/10 cursor-pointer"
                    aria-label={showQuestion ? "Hide question" : "Show question"}
                    disabled={showQuestion}
                  >
                    {showQuestion ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </Button>
                  <AlertDialog open={showConfirmRefresh} onOpenChange={setShowConfirmRefresh}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRefreshClick}
                        className="hover:bg-primary/10 cursor-pointer"
                        aria-label="Refresh question"
                        disabled={!showQuestion || recording || isTranscribing || isProcessing}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Discard current video?</AlertDialogTitle>
                        <AlertDialogDescription>Refreshing the question will remove the current recording or uploaded video. This cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          refreshQuestionAndRecorder();
                          setShowConfirmRefresh(false);
                        }} className="cursor-pointer">Discard & Refresh</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <QuestionPrompt question={showQuestion ? question : null} />
              {/* Thinking Timer (only for record mode) */}
              {mode === "record" && showQuestion && thinkingTimer.active && !recording && (
                <div className="mt-4">
                  <Timer
                    duration={thinkingTime}
                    running={thinkingTimer.active}
                  />
                </div>
              )}
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
              onStartRecording={handleManualStartRecording}
              onStopRecording={handleManualStopRecording}
              onFileUpload={handleFileUpload}
              onClearUploadedFile={clearUploadedFile}
              onTranscribe={transcribeRecording}
              onSave={saveRecording}
              showQuestion={showQuestion}
            />
            {/* Response Timer (only for record mode) */}
            {mode === "record" && responseTimer.active && recording && (
              <div className="mt-4">
                <Timer
                  duration={responseTime}
                  running={responseTimer.active}
                />
              </div>
            )}

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