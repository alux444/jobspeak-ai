import React, { useRef } from "react";

interface ControlsProps {
  recording: boolean;
  recordedChunks: Blob[];
  uploadedFile: File | null;
  mode: "record" | "upload";
  isProcessing: boolean;
  isTranscribing: boolean;
  showTranscription: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSaveRecording: () => void;
  onTranscribeRecording: () => void;
  onFileUpload: (file: File) => void;
  onSwitchMode: (mode: "record" | "upload") => void;
  onClearUploadedFile: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  recording,
  recordedChunks,
  uploadedFile,
  mode,
  isProcessing,
  isTranscribing,
  showTranscription,
  onStartRecording,
  onStopRecording,
  onSaveRecording,
  onTranscribeRecording,
  onFileUpload,
  onSwitchMode,
  onClearUploadedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type.startsWith('video/')) {
        onFileUpload(file);
      } else {
        alert('Please select a video file.');
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const hasVideoContent = (mode === "record" && recordedChunks.length > 0) || 
                         (mode === "upload" && uploadedFile);

  return (
    <div className="controls">
      {/* Mode Switcher */}
      <div className="mode-switcher">
        <button 
          onClick={() => onSwitchMode("record")}
          className={mode === "record" ? "active" : ""}
          disabled={isProcessing || isTranscribing}
        >
          Record Video
        </button>
        <button 
          onClick={() => onSwitchMode("upload")}
          className={mode === "upload" ? "active" : ""}
          disabled={isProcessing || isTranscribing}
        >
          Upload Video
        </button>
      </div>

      {/* Recording Controls */}
      {mode === "record" && (
        <div className="recording-controls">
          <button 
            onClick={recording ? onStopRecording : onStartRecording} 
            disabled={isProcessing || isTranscribing}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      )}

      {/* Upload Controls */}
      {mode === "upload" && (
        <div className="upload-controls">
          <button 
            onClick={handleUploadClick}
            disabled={isProcessing || isTranscribing}
          >
            Choose Video File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {uploadedFile && (
            <div className="uploaded-file-info">
              <span>📹 {uploadedFile.name}</span>
              <button 
                onClick={onClearUploadedFile}
                disabled={isProcessing || isTranscribing}
                className="clear-file-btn"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* Common Controls */}
      {hasVideoContent && !isProcessing && !isTranscribing && !showTranscription && (
        <div className="action-controls">
          {mode === "record" && <button onClick={onSaveRecording}>Save Recording</button>}
          <button onClick={onTranscribeRecording}>Transcribe Recording</button>
        </div>
      )}
    </div>
  );
};

export default Controls; 