import type { AnalysisResponse } from "../api/ApiService";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import RawData from "./RawData";
import { downloadAnalysisAsText } from "../utils/downloadAnalysis";

interface AnalysisResultsProps {
  analysisResults: AnalysisResponse | null;
}

export default function AnalysisResults({ analysisResults }: AnalysisResultsProps) {
  if (!analysisResults) return null;

  const { feedbackSummary, agentResults, sentimentModelResponse } = analysisResults;

  const handleDownload = () => {
    downloadAnalysisAsText(analysisResults);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Download Analysis Report
        </Button>
      </div>

      {/* Overall Feedback */}
      {feedbackSummary && (
        <Card className="w-full">
          <CardContent className="space-y-5">
            <h3 className="text-lg font-semibold">Overall Feedback</h3>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-medium mb-1 sm:mb-0 w-full sm:w-44">Verdict:</span>
              <span className="sm:ml-4 font-extrabold text-xl sm:text-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {feedbackSummary.verdict}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-medium mb-1 sm:mb-0 w-full sm:w-44">Strengths:</span>
              <span className="sm:ml-4 flex-1 text-green-600 dark:text-green-300 ">{feedbackSummary.strengths}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-medium mb-1 sm:mb-0 w-full sm:w-44">Weaknesses:</span>
              <span className="sm:ml-4 flex-1 text-red-600 dark:text-red-300">{feedbackSummary.weaknesses}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-medium mb-1 sm:mb-0 w-full sm:w-44">Improvement Suggestion:</span>
              <span className="sm:ml-4 flex-1">{feedbackSummary.improvement_suggestion}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mt-4 border-t border-primary/30 pt-4">
              <span className="font-medium mb-1 sm:mb-0 w-full sm:w-44">Overall Score:</span>
              <span className="sm:ml-4 font-extrabold text-xl sm:text-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {feedbackSummary.overall_score} / 100
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Results */}
      {agentResults && (
        <Card className="w-full">
          <CardContent className="space-y-4">
            <h4 className="text-lg font-semibold">Raw Agent Data</h4>

            {/* Sentiment AI Model */}
            {sentimentModelResponse && (
              <RawData title="Emotion Analysis (AI Model)" data={sentimentModelResponse} />
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
}
