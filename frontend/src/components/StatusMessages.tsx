import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mic, AlertCircle } from "lucide-react";

interface StatusMessagesProps {
  isTranscribing: boolean;
  isProcessing: boolean;
  error: string | null;
}

const StatusMessages: React.FC<StatusMessagesProps> = ({
  isTranscribing,
  isProcessing,
  error,
}) => {
  return (
    <div className="space-y-3 transition-colors">
      {isTranscribing && (
        <Alert variant="default" className="flex items-center gap-2">
          <Loader2 className="animate-spin h-4 w-4 text-blue-500 mr-2" />
          <AlertTitle>Transcribing</AlertTitle>
          <AlertDescription>Transcribing your recording...</AlertDescription>
        </Alert>
      )}
      {isProcessing && (
        <Alert variant="destructive" className="flex items-center gap-2">
          <Mic className="animate-pulse h-4 w-4 text-purple-500 mr-2" />
          <AlertTitle>Analysing</AlertTitle>
          <AlertDescription>Analysing your recording...</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StatusMessages;