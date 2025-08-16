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
      {/* Overall Feedback */}
      {feedbackSummary && (
        <Card>
          <CardContent className="space-y-5">
            <h3 className="text-lg font-semibold">Overall Feedback</h3>

            {/* Verdict */}
            <div className="flex justify-between items-center">
              <span className="font-medium mb-1 sm:mb-0 w-44">Verdict:</span>
              <span className="font-extrabold text-xl text-yellow-500 dark:text-yellow-400">
                {feedbackSummary.verdict}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <span className="font-medium mb-1 sm:mb-0 w-44">Strengths:</span>
              <span className="sm:ml-4 flex-1">{feedbackSummary.strengths}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <span className="font-medium mb-1 sm:mb-0 w-44">Weaknesses:</span>
              <span className="sm:ml-4 flex-1">{feedbackSummary.weaknesses}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <span className="font-medium mb-1 sm:mb-0 w-44">Improvement Suggestion:</span>
              <span className="sm:ml-4 flex-1">{feedbackSummary.improvement_suggestion}</span>
            </div>
            <div className="flex justify-between items-center mt-4 border-t border-primary/30 pt-4">
              <span className="font-semibold text-lg w-44">Overall Score:</span>
                <span className="font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">
                {feedbackSummary.overall_score} / 100
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Results */}
      {agentResults && (
        <Card>
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
