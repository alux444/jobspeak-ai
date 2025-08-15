import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Square, Video } from "lucide-react";

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
      if (file.type.startsWith("video/")) {
        onFileUpload(file);
      } else {
        alert("Please select a video file.");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="controls space-y-2">
        <div className="flex space-x-3">
          {recording && (
            <div className="flex items-center space-x-2 text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording</span>
            </div>
          )}
          {/* Upload Button */}
          <Button
            variant="outline"
            className="justify-start"
            onClick={handleUploadClick}
            disabled={mode !== "upload" || isProcessing || isTranscribing}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
          {/* Hidden file input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {/* Record Button */}
          <Button
            onClick={recording ? onStopRecording : onStartRecording}
            variant={recording ? "destructive" : "default"}
            className="justify-start"
            disabled={mode !== "record" || isProcessing || isTranscribing}
          >
            {recording ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" />
                Record Video
              </>
            )}
          </Button>
        </div>

        {/* Uploaded file info */}
        {mode === "upload" && uploadedFile && (
          <div className="uploaded-file-info flex items-center gap-2 bg-muted px-3 py-2 rounded">
            <Label className="flex items-center gap-1">
              <span role="img" aria-label="video">📹</span>
              {uploadedFile.name}
            </Label>
            <Button
              onClick={onClearUploadedFile}
              disabled={isProcessing || isTranscribing}
              variant="ghost"
              size="icon"
              className="clear-file-btn"
              aria-label="Clear file"
            >
              <X size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;