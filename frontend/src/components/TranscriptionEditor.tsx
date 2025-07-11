import React from "react";

interface TranscriptionEditorProps {
  transcription: string;
  isProcessing: boolean;
  onTranscriptionEdit: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTranscriptionSubmit: () => void;
  onTranscriptionCancel: () => void;
}

const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
  transcription,
  isProcessing,
  onTranscriptionEdit,
  onTranscriptionSubmit,
  onTranscriptionCancel,
}) => {
  return (
    <div className="transcription-editor">
      <h3>Review and Edit Transcription</h3>
      <p>Please review the transcription below and make any necessary edits before proceeding to analysis:</p>
      
      <textarea
        value={transcription}
        onChange={onTranscriptionEdit}
        placeholder="Transcription will appear here..."
        rows={8}
        cols={60}
      />
      
      <div className="transcription-actions">
        <button onClick={onTranscriptionSubmit} disabled={isProcessing}>
          {isProcessing ? "Analyzing..." : "Proceed to Analysis"}
        </button>
        <button onClick={onTranscriptionCancel} disabled={isProcessing}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TranscriptionEditor; 