import React from "react";
import type { AnalysisResponse } from "../api/ApiService";

interface AnalysisResultsProps {
  analysisResults: AnalysisResponse | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisResults }) => {
  if (!analysisResults) return null;

  if (analysisResults.feedbackSummary) {
    const summary = analysisResults.feedbackSummary;
    return (
      <div className="analysis-results">
        <h3>Overall Feedback</h3>
        <div className="feedback-summary">
          <div className="feedback-row">
            <span className="feedback-label">Verdict:</span>
            <span className="feedback-value verdict">{summary.verdict}</span>
          </div>
          <div className="feedback-row">
            <span className="feedback-label">Strengths:</span>
            <span className="feedback-value">{summary.strengths}</span>
          </div>
          <div className="feedback-row">
            <span className="feedback-label">Weaknesses:</span>
            <span className="feedback-value">{summary.weaknesses}</span>
          </div>
          <div className="feedback-row">
            <span className="feedback-label">Improvement Suggestion:</span>
            <span className="feedback-value">{summary.improvement_suggestion}</span>
          </div>
          <div className="feedback-row">
            <span className="feedback-label">Overall Score:</span>
            <span className="feedback-value score">{summary.overall_score} / 100</span>
          </div>
        </div>
      </div>
    );
  }

  // TODO: format all the results
  return (
    <div className="analysis-results">
      <h3>Analysis Results</h3>

      {analysisResults?.results && (
        <div className="audio-analysis">
          <h4>Audio Analysis</h4>
          <pre>{JSON.stringify(analysisResults.results, null, 2)}</pre>
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
