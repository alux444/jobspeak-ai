import React from "react";

interface ControlsProps {
  recording: boolean;
  recordedChunks: Blob[];
  isProcessing: boolean;
  isTranscribing: boolean;
  showTranscription: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSaveRecording: () => void;
  onTranscribeRecording: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  recording,
  recordedChunks,
  isProcessing,
  isTranscribing,
  showTranscription,
  onStartRecording,
  onStopRecording,
  onSaveRecording,
  onTranscribeRecording,
}) => {
  return (
    <div className="controls">
      <button 
        onClick={recording ? onStopRecording : onStartRecording} 
        disabled={isProcessing || isTranscribing}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {recordedChunks.length > 0 && !isProcessing && !isTranscribing && !showTranscription && (
        <>
          <button onClick={onSaveRecording}>Save Recording</button>
          <button onClick={onTranscribeRecording}>Transcribe Recording</button>
        </>
      )}
    </div>
  );
};

export default Controls; 