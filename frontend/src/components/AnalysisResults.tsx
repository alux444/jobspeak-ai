import React from "react";
import type { AnalysisResponse } from "../api/ApiService";

interface AnalysisResultsProps {
  analysisResults: AnalysisResponse | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisResults }) => {
  if (!analysisResults) return null;

  return (
    <div className="analysis-results">
      <h3>Analysis Results</h3>

      {analysisResults?.results && (
        <div className="audio-analysis">
          <h4>Audio Analysis</h4>
          {Object.entries(analysisResults.results).map(([feature, data]: [string, { Score: number; Feedback: string }]) => (
            <div key={feature} className="feature">
              <h5>{feature}</h5>
              <p>Score: {data.Score}/10</p>
              <p>Feedback: {data.Feedback}</p>
            </div>
          ))}
        </div>
      )}

      {analysisResults?.sentiment && (
        <div className="sentiment-analysis">
          <h4>Sentiment Analysis</h4>
          <pre>{JSON.stringify(analysisResults.sentiment, null, 2)}</pre>
        </div>
      )}

      {analysisResults?.transcription && (
        <div className="transcription">
          <h4>Final Transcription</h4>
          <p>{analysisResults.transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults; 