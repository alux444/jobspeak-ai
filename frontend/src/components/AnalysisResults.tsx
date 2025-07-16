import React, { useState } from "react";
import type { AnalysisResponse } from "../api/ApiService";

interface AnalysisResultsProps {
  analysisResults: AnalysisResponse | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisResults }) => {
  // Expand/collapse state for each agent (must be at the top, before any return)
  const [showKeyword, setShowKeyword] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showSentiment, setShowSentiment] = useState(false);

  if (!analysisResults) return null;

  if (analysisResults.feedbackSummary) {
    const summary = analysisResults.feedbackSummary;
    const agentResults = analysisResults.agentResults;
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
        {/* Agent Results Expandable Sections */}
        {agentResults && (
          <div className="agent-results">
            <h4>Agent Results (Raw Data)</h4>
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowKeyword((v) => !v)}>
                {showKeyword ? "Hide" : "Show"} Keyword Analysis
              </button>
              {showKeyword && (
                <pre>{JSON.stringify(agentResults.keywordAnalysis, null, 2)}</pre>
              )}
            </div>
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowContent((v) => !v)}>
                {showContent ? "Hide" : "Show"} Content Analysis
              </button>
              {showContent && (
                <pre>{JSON.stringify(agentResults.responseContent, null, 2)}</pre>
              )}
            </div>
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowSentiment((v) => !v)}>
                {showSentiment ? "Hide" : "Show"} Sentiment Analysis
              </button>
              {showSentiment && (
                <pre>{JSON.stringify(agentResults.responseSentiment, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
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
