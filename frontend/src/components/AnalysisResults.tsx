import type { AnalysisResponse } from "../api/ApiService";
import { Card, CardContent } from "./ui/card";
import RawData from "./RawData";

interface AnalysisResultsProps {
  analysisResults: AnalysisResponse | null;
}

export default function AnalysisResults({ analysisResults }: AnalysisResultsProps) {
  if (!analysisResults) return null;

  const { feedbackSummary, agentResults, sentimentModelResponse } = analysisResults;

  return (
    <div className="space-y-6">
      {/* Overall Feedback */}
      {feedbackSummary && (
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">Overall Feedback</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Verdict:</span>
                <span className="text-green-700 font-semibold">{feedbackSummary.verdict}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Strengths:</span>
                <span>{feedbackSummary.strengths}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Weaknesses:</span>
                <span>{feedbackSummary.weaknesses}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Improvement Suggestion:</span>
                <span>{feedbackSummary.improvement_suggestion}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Overall Score:</span>
                <span className="font-semibold">{feedbackSummary.overall_score} / 100</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Results */}
      {agentResults && (
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="space-y-4">
            <h4 className="text-lg font-semibold">Raw Agent Data</h4>

            {/* Sentiment AI Model */}
            {sentimentModelResponse && (
              <RawData
                title="Emotion Analysis (AI Model)"
                data={sentimentModelResponse}
              />
            )}

            {/* Audio Analysis */}
            {agentResults.audioAnalysis && (
              <RawData title="Audio Analysis" data={agentResults.audioAnalysis} />
            )}

            {/* Video Analysis */}
            {agentResults.videoAnalysis && (
              <RawData title="Video Analysis (Facial Emotion Recognition)" data={agentResults.videoAnalysis} />
            )}

            {/* Keyword Analysis */}
            {agentResults.keywordAnalysis && (
              <RawData title="Keyword Analysis" data={agentResults.keywordAnalysis} />
            )}

            {/* Content Analysis */}
            {agentResults.responseContent && (
              <RawData title="Content Analysis" data={agentResults.responseContent} />
            )}

            {/* Sentiment Analysis */}
            {agentResults.responseSentiment && (
              <RawData title="Sentiment Analysis" data={agentResults.responseSentiment} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
