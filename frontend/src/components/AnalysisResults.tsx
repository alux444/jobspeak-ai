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
  const [showAudio, setShowAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showSentimentRaw, setShowSentimentRaw] = useState(false);

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
            {/* Sentiment Model Results */}
            {analysisResults.sentimentModelResponse && (
              <div className="agent-section">
                <button className="expand-btn" onClick={() => setShowSentimentRaw((v) => !v)}>
                  {showSentimentRaw ? "Hide" : "Show"} Emotion Analysis (AI Model)
                </button>
                {showSentimentRaw && (
                  <div className="sentiment-model-results">
                    <div className="sentiment-model-summary">
                      <h6>Detected Emotions:</h6>
                      {analysisResults.sentimentModelResponse.analysis[0]?.map((emotion, index) => (
                        <div key={index} className="emotion-item">
                          <span className="emotion-label">{emotion.label}:</span>
                          <span className="emotion-score">{(emotion.score * 100).toFixed(1)}%</span>
                          <div className="emotion-bar">
                            <div className="emotion-fill" style={{ width: `${emotion.score * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <details style={{ marginTop: "15px" }}>
                      <summary style={{ cursor: "pointer", color: "#a0aec0" }}>View Raw Data</summary>
                      <pre style={{ marginTop: "10px" }}>{JSON.stringify(analysisResults.sentimentModelResponse, null, 2)}</pre>
                    </details>
                  </div>
                )}
              </div>
            )}
            {/* Existing agent results */}
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowAudio((v) => !v)}>
                {showAudio ? "Hide" : "Show"} Audio Analysis
              </button>
              {showAudio && <pre>{JSON.stringify(agentResults.audioAnalysis, null, 2)}</pre>}
            </div>
            {/* Video Analysis Section */}
            {agentResults.videoAnalysis && (
              <div className="agent-section">
                <button className="expand-btn" onClick={() => setShowVideo((v) => !v)}>
                  {showVideo ? "Hide" : "Show"} Video Analysis (Facial Emotion Recognition)
                </button>
                {showVideo && (
                  <div className="video-analysis-results">
                    <div className="video-analysis-summary">
                      <h6>Assessment:</h6>
                      {agentResults.videoAnalysis.assessment.map((item, index) => (
                        <div key={index} className="assessment-item">
                          • {item}
                        </div>
                      ))}

                      <h6>Emotion Scores:</h6>
                      {Object.entries(agentResults.videoAnalysis.scores).map(([emotion, score]) => (
                        <div key={emotion} className="emotion-score-item">
                          <span className="emotion-label">{emotion}:</span>
                          <span className="emotion-score">{score.toFixed(2)}</span>
                          {emotion.includes("Score") && (
                            <div className="emotion-bar">
                              <div className="emotion-fill" style={{ width: `${Math.min(score, 100)}%` }} />
                            </div>
                          )}
                        </div>
                      ))}

                      <h6>Improvement Suggestions:</h6>
                      {agentResults.videoAnalysis.improvement.map((item, index) => (
                        <div key={index} className="improvement-item">
                          • {item}
                        </div>
                      ))}
                    </div>
                    <details style={{ marginTop: "15px" }}>
                      <summary style={{ cursor: "pointer", color: "#a0aec0" }}>View Raw Data</summary>
                      <pre style={{ marginTop: "10px" }}>{JSON.stringify(agentResults.videoAnalysis, null, 2)}</pre>
                    </details>
                  </div>
                )}
              </div>
            )}
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowKeyword((v) => !v)}>
                {showKeyword ? "Hide" : "Show"} Keyword Analysis
              </button>
              {showKeyword && <pre>{JSON.stringify(agentResults.keywordAnalysis, null, 2)}</pre>}
            </div>
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowContent((v) => !v)}>
                {showContent ? "Hide" : "Show"} Content Analysis
              </button>
              {showContent && <pre>{JSON.stringify(agentResults.responseContent, null, 2)}</pre>}
            </div>
            <div className="agent-section">
              <button className="expand-btn" onClick={() => setShowSentiment((v) => !v)}>
                {showSentiment ? "Hide" : "Show"} Sentiment Analysis
              </button>
              {showSentiment && <pre>{JSON.stringify(agentResults.responseSentiment, null, 2)}</pre>}
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
      {analysisResults?.sentimentModelResponse && (
        <div className="sentiment-analysis">
          <h4>Emotion Analysis (AI Model)</h4>
          <div className="sentiment-model-results">
            <div className="sentiment-model-summary">
              <h6>Detected Emotions:</h6>
              {analysisResults.sentimentModelResponse.analysis[0]?.map((emotion, index) => (
                <div key={index} className="emotion-item">
                  <span className="emotion-label">{emotion.label}:</span>
                  <span className="emotion-score">{(emotion.score * 100).toFixed(1)}%</span>
                  <div className="emotion-bar">
                    <div className="emotion-fill" style={{ width: `${emotion.score * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analysisResults?.videoAnalysis && (
        <div className="video-analysis">
          <h4>Video Analysis (Facial Emotion Recognition)</h4>
          <div className="video-analysis-results">
            <div className="video-analysis-summary">
              <h6>Assessment:</h6>
              {analysisResults.videoAnalysis.assessment.map((item, index) => (
                <div key={index} className="assessment-item">
                  • {item}
                </div>
              ))}

              <h6>Emotion Scores:</h6>
              {Object.entries(analysisResults.videoAnalysis.scores).map(([emotion, score]) => (
                <div key={emotion} className="emotion-score-item">
                  <span className="emotion-label">{emotion}:</span>
                  <span className="emotion-score">{score}</span>
                  {emotion.includes("Score") && (
                    <div className="emotion-bar">
                      <div className="emotion-fill" style={{ width: `${Math.min(score, 100)}%` }} />
                    </div>
                  )}
                </div>
              ))}

              <h6>Improvement Suggestions:</h6>
              {analysisResults.videoAnalysis.improvement.map((item, index) => (
                <div key={index} className="improvement-item">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analysisResults?.sentiment && (
        <div className="sentiment-analysis">
          <h4>Sentiment Analysis (Agent)</h4>
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
