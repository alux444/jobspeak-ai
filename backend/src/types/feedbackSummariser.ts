export interface AudioAnalysis {
  assessment: string[];
  scores: {
    clarityAndArticulation: number;
    toneAndEmotion: number;
    confidence: number;
    pace: number;
  };
  improvement: string[];
}

export interface KeywordAnalysis {
  matched_keywords: string[];
  missing_keywords: string[];
  score: number;
  notes: string;
}

export interface ResponseContentAnalysis {
  assessment: string[];
  scores: {
    clarityAndStructure: number;
    relevance: number;
    useOfStarMethod: number;
    impact: number;
    authenticity: number;
  };
  improvement: string[];
}

export interface ResponseSentimentAnalysis {
  sentiment: string;
  confidence: number;
  evidence: string[];
}

export interface VideoAnalysis {
  assessment: string[];
  scores: {
    facialExpression: number;
    // add more
  };
  improvement: string[];
}

export interface FeedbackSummariserInput {
  keywordAnalysis: KeywordAnalysis;
  responseContentAnalysis: ResponseContentAnalysis;
  responseSentimentAnalysis: ResponseSentimentAnalysis;
}

export interface FeedbackSummary {
  verdict: string;
  strengths: string;
  weaknesses: string;
  improvement_suggestion: string;
  overall_score: number;
}
