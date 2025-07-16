import React from "react";

interface StatusMessagesProps {
  isTranscribing: boolean;
  isProcessing: boolean;
  error: string | null;
  analysisProgress?: Record<string, string>;
}

const stepLabels: Record<string, string> = {
  keyword: "Keyword Analysis",
  content: "Content Analysis",
  sentiment: "Sentiment Analysis",
  summary: "Feedback Summary",
};

const StatusMessages: React.FC<StatusMessagesProps> = ({
  isTranscribing,
  isProcessing,
  error,
  analysisProgress,
}) => {
  return (
    <>
      {isTranscribing && <div className="processing">Transcribing your recording...</div>}
      {isProcessing && <div className="processing">Analyzing your recording...</div>}
      {error && <div className="error">Error: {error}</div>}
      {analysisProgress && (
        <div className="analysis-checklist">
          <h4>Analysis Progress</h4>
          <ul>
            {Object.entries(stepLabels).map(([step, label]) => (
              <li key={step} className={`step-${analysisProgress[step]}`}>
                {analysisProgress[step] === "done" && <span style={{color: '#4caf50'}}>✔</span>}
                {analysisProgress[step] === "in_progress" && <span style={{color: '#1976d2'}}>⏳</span>}
                {analysisProgress[step] === "error" && <span style={{color: '#c62828'}}>✖</span>}
                {analysisProgress[step] === "pending" && <span style={{color: '#aaa'}}>•</span>}
                <span style={{marginLeft: 8}}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default StatusMessages; 