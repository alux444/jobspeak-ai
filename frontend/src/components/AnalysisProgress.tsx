import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2, AlertCircle, Circle } from "lucide-react";

interface AnalysisProgressProps {
  analysisProgress?: Record<string, "done" | "in_progress" | "pending" | "error">;
}

const stepLabels: Record<string, string> = {
  audio: "Audio Analysis",
  video: "Video Analysis (Facial Emotions)",
  keyword: "Keyword Analysis",
  content: "Content Analysis",
  sentiment_model: "Sentiment Model",
  sentiment: "Sentiment Analysis",
  summary: "Feedback Summary",
};

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ analysisProgress }) => {
  const [ellipsis, setEllipsis] = useState(".");

  useEffect(() => {
    if (!analysisProgress) return;
    const interval = setInterval(() => {
      setEllipsis((prev) => (prev === "." ? ".." : prev === ".." ? "..." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, [analysisProgress]);

  if (!analysisProgress) return null;

  const steps = Object.keys(stepLabels);
  const doneCount = steps.filter((step) => analysisProgress[step] === "done").length;
  const progressPercent = (doneCount / steps.length) * 100;

  const getStepIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle className="text-green-500" />;
      case "in_progress":
        return <Loader2 className="text-blue-500 animate-spin" />;
      case "pending":
        return <Circle className="text-gray-400" />;
      case "error":
        return <AlertCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-medium transition-colors">
      <CardHeader>
        <CardTitle>Analysis Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-1">
          <Progress value={progressPercent} className="h-2 rounded-full" />
          <div className="text-xs text-muted-foreground">{doneCount} / {steps.length} complete</div>
        </div>

        {/* Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step) => {
            const status = analysisProgress[step];
            return (
              <Card
                key={step}
                className={
                  `flex flex-row items-center space-x-2 p-3 rounded-md border shadow-none transition-colors
                  ${status === "done" ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700" : ""}
                  ${status === "in_progress" ? "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 animate-pulse" : ""}
                  ${status === "pending" ? "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700" : ""}
                  ${status === "error" ? "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700" : ""}`
                }
              >
                <div>{getStepIcon(status)}</div>
                <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                  {stepLabels[step]}
                  {status === "in_progress" && <span className="ml-1">{ellipsis}</span>}
                </div>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisProgress;
