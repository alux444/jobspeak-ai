import type { AnalysisResponse } from '../api/ApiService';

/**
 * Formats the analysis results into a readable text format
 */
export function formatAnalysisAsText(analysisResults: AnalysisResponse): string {
  const sections: string[] = [];
  const divider = '='.repeat(60);
  const subDivider = '-'.repeat(40);

  // Header
  sections.push('INTERVIEW ANALYSIS REPORT');
  sections.push(divider);
  sections.push(`Generated on: ${new Date().toLocaleString()}`);
  sections.push('');

  // Overall Feedback Section
  if (analysisResults.feedbackSummary) {
    const { feedbackSummary } = analysisResults;
    
    sections.push('OVERALL FEEDBACK');
    sections.push(divider);
    sections.push(`Verdict: ${feedbackSummary.verdict}`);
    sections.push(`Overall Score: ${feedbackSummary.overall_score}/100`);
    sections.push('');
    
    sections.push('Strengths:');
    sections.push(feedbackSummary.strengths);
    sections.push('');
    
    sections.push('Weaknesses:');
    sections.push(feedbackSummary.weaknesses);
    sections.push('');
    
    sections.push('Improvement Suggestions:');
    sections.push(feedbackSummary.improvement_suggestion);
    sections.push('');
  }

  // Detailed Analysis Section
  if (analysisResults.agentResults) {
    const { agentResults } = analysisResults;
    
    sections.push('DETAILED ANALYSIS');
    sections.push(divider);

    // Audio Analysis
    if (agentResults.audioAnalysis) {
      sections.push('AUDIO ANALYSIS');
      sections.push(subDivider);
      
      const scores = agentResults.audioAnalysis.scores;
      if (scores) {
        sections.push('Scores:');
        sections.push(`  • Clarity and Articulation: ${scores.clarityAndArticulation ?? 'N/A'}/10`);
        sections.push(`  • Tone and Emotion: ${scores.toneAndEmotion ?? 'N/A'}/10`);
        sections.push(`  • Confidence: ${scores.confidence ?? 'N/A'}/10`);
        sections.push(`  • Pace: ${scores.pace ?? 'N/A'}/10`);
        sections.push('');
      }
      
      if (agentResults.audioAnalysis.assessment && agentResults.audioAnalysis.assessment.length > 0) {
        sections.push('Assessment:');
        agentResults.audioAnalysis.assessment.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
      
      if (agentResults.audioAnalysis.improvement && agentResults.audioAnalysis.improvement.length > 0) {
        sections.push('Improvement Areas:');
        agentResults.audioAnalysis.improvement.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
    }

    // Content Analysis
    if (agentResults.responseContent) {
      sections.push('CONTENT ANALYSIS');
      sections.push(subDivider);
      
      const scores = agentResults.responseContent.scores;
      if (scores) {
        sections.push('Scores:');
        sections.push(`  • Clarity and Structure: ${scores.clarityAndStructure ?? 'N/A'}/10`);
        sections.push(`  • Relevance: ${scores.relevance ?? 'N/A'}/10`);
        sections.push(`  • Use of STAR Method: ${scores.useOfStarMethod ?? 'N/A'}/10`);
        sections.push(`  • Impact: ${scores.impact ?? 'N/A'}/10`);
        sections.push(`  • Authenticity: ${scores.authenticity ?? 'N/A'}/10`);
        sections.push('');
      }
      
      if (agentResults.responseContent.assessment && agentResults.responseContent.assessment.length > 0) {
        sections.push('Assessment:');
        agentResults.responseContent.assessment.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
      
      if (agentResults.responseContent.improvement && agentResults.responseContent.improvement.length > 0) {
        sections.push('Improvement Areas:');
        agentResults.responseContent.improvement.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
    }

    // Keyword Analysis
    if (agentResults.keywordAnalysis) {
      sections.push('KEYWORD ANALYSIS');
      sections.push(subDivider);
      sections.push(`Score: ${agentResults.keywordAnalysis.score ?? 'N/A'}/10`);
      sections.push('');
      
      if (agentResults.keywordAnalysis.matched_keywords && agentResults.keywordAnalysis.matched_keywords.length > 0) {
        sections.push('Matched Keywords:');
        agentResults.keywordAnalysis.matched_keywords.forEach(keyword => {
          sections.push(`  • ${keyword}`);
        });
        sections.push('');
      }
      
      if (agentResults.keywordAnalysis.missing_keywords && agentResults.keywordAnalysis.missing_keywords.length > 0) {
        sections.push('Missing Keywords:');
        agentResults.keywordAnalysis.missing_keywords.forEach(keyword => {
          sections.push(`  • ${keyword}`);
        });
        sections.push('');
      }
      
      if (agentResults.keywordAnalysis.notes) {
        sections.push('Notes:');
        sections.push(agentResults.keywordAnalysis.notes);
        sections.push('');
      }
    }

    // Sentiment Analysis
    if (agentResults.responseSentiment) {
      sections.push('SENTIMENT ANALYSIS');
      sections.push(subDivider);
      sections.push(`Sentiment: ${agentResults.responseSentiment.sentiment ?? 'N/A'}`);
      sections.push(`Confidence: ${agentResults.responseSentiment.confidence ? (agentResults.responseSentiment.confidence * 100).toFixed(1) + '%' : 'N/A'}`);
      sections.push('');
      
      if (agentResults.responseSentiment.evidence && agentResults.responseSentiment.evidence.length > 0) {
        sections.push('Evidence:');
        agentResults.responseSentiment.evidence.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
    }

    // Video Analysis
    if (agentResults.videoAnalysis) {
      sections.push('VIDEO ANALYSIS (Facial Emotion Recognition)');
      sections.push(subDivider);
      
      const scores = agentResults.videoAnalysis.scores;
      if (scores) {
        sections.push('Scores:');
        sections.push(`  • Facial Expression: ${scores.facialExpression ?? 'N/A'}/10`);
        sections.push('');
      }
      
      if (agentResults.videoAnalysis.assessment && agentResults.videoAnalysis.assessment.length > 0) {
        sections.push('Assessment:');
        agentResults.videoAnalysis.assessment.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
      
      if (agentResults.videoAnalysis.improvement && agentResults.videoAnalysis.improvement.length > 0) {
        sections.push('Improvement Areas:');
        agentResults.videoAnalysis.improvement.forEach(item => {
          sections.push(`  • ${item}`);
        });
        sections.push('');
      }
    }
  }

  // Emotion Analysis (AI Model)
  if (analysisResults.sentimentModelResponse) {
    sections.push('EMOTION ANALYSIS (AI Model)');
    sections.push(subDivider);
    sections.push(`Input: ${analysisResults.sentimentModelResponse.input}`);
    sections.push('');
    
    if (analysisResults.sentimentModelResponse.analysis && analysisResults.sentimentModelResponse.analysis.length > 0) {
      sections.push('Analysis Results:');
      analysisResults.sentimentModelResponse.analysis.forEach((batch, batchIndex) => {
        sections.push(`  Batch ${batchIndex + 1}:`);
        batch.forEach(result => {
          sections.push(`    • ${result.label}: ${(result.score * 100).toFixed(1)}%`);
        });
      });
      sections.push('');
    }
  }

  // Additional Information
  if (analysisResults.transcription) {
    sections.push('TRANSCRIPTION');
    sections.push(divider);
    sections.push(analysisResults.transcription);
    sections.push('');
  }

  if (analysisResults.duration_seconds) {
    sections.push('RECORDING DETAILS');
    sections.push(divider);
    sections.push(`Duration: ${analysisResults.duration_seconds} seconds`);
    sections.push('');
  }

  sections.push('');
  sections.push('End of Report');
  sections.push(divider);

  return sections.join('\n');
}

/**
 * Downloads the analysis results as a text file
 */
export function downloadAnalysisAsText(analysisResults: AnalysisResponse, filename?: string): void {
  const textContent = formatAnalysisAsText(analysisResults);
  
  // Create blob with the text content
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set filename with timestamp if not provided
  const defaultFilename = `interview-analysis-${new Date().toISOString().split('T')[0]}.txt`;
  link.download = filename || defaultFilename;
  link.href = url;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}