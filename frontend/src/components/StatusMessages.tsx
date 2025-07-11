import React from "react";

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
    <>
      {isTranscribing && <div className="processing">Transcribing your recording...</div>}
      {isProcessing && <div className="processing">Analyzing your recording...</div>}
      {error && <div className="error">Error: {error}</div>}
    </>
  );
};

export default StatusMessages; 