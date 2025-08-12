import React, { useRef } from "react";
import { Toggle } from "./Toggle";

interface ControlsProps {
  recording: boolean;
  uploadedFile: File | null;
  mode: "record" | "upload";
  isProcessing: boolean;
  isTranscribing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUpload: (file: File) => void;
  onSwitchMode: (mode: "record" | "upload") => void;
  onClearUploadedFile: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  recording,
  uploadedFile,
  mode,
  isProcessing,
  isTranscribing,
  onStartRecording,
  onStopRecording,
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

  return (
    <div>
      {/* Toggle */}
      <Toggle
        isCustomMode={mode === "upload"}
        onToggle={(isCustom) => onSwitchMode(isCustom ? "upload" : "record")}
        leftLabel="Record Video"
        rightLabel="Upload Video"
        disabled={isProcessing || isTranscribing}
      />

      <div className="controls">
        {/* Recording Controls */}
        {mode === "record" && (
          <button
            onClick={recording ? onStopRecording : onStartRecording}
            disabled={isProcessing || isTranscribing}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
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
      </div>
    </div>
  );
};

export default Controls; 