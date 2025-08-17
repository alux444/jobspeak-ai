import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { RefreshCcw, VideoIcon, Square, Upload, Trash2, Save, FileText, Loader2 } from "lucide-react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface ActionButtonsProps {
  mode: "record" | "upload";
  recording: boolean;
  hasVideo: boolean;
  uploadedFile: File | null;
  isProcessing: boolean;
  isTranscribing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUpload: (file: File) => void;
  onClearUploadedFile: () => void;
  onTranscribe: () => void;
  onSave: () => void;
}

export function ActionButtons({
  mode,
  recording,
  hasVideo,
  uploadedFile,
  isProcessing,
  isTranscribing,
  onStartRecording,
  onStopRecording,
  onFileUpload,
  onClearUploadedFile,
  onTranscribe,
  onSave,
}: ActionButtonsProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onFileUpload(e.target.files[0]);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* Record / Stop / Record Again */}
      {mode === "record" && !recording && hasVideo ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isProcessing || isTranscribing}>
              <label className="flex items-center gap-2 cursor-pointer m-0">
                <RefreshCcw className="w-4 h-4 mr-2" /> Record Again
              </label>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard current video?</AlertDialogTitle>
              <AlertDialogDescription>
                Starting a new recording will remove the existing video. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onStartRecording}>Discard & Record Again</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : mode === "record" && !recording ? (
        <Button onClick={onStartRecording} disabled={isProcessing || isTranscribing} className="cursor-pointer">
          <VideoIcon className="w-4 h-4 mr-2" /> Start Recording
        </Button>
      ) : mode === "record" && recording ? (
        <Button variant="destructive" onClick={onStopRecording} disabled={isProcessing || isTranscribing} className="cursor-pointer">
          <Square className="w-4 h-4 mr-2" /> Stop Recording
        </Button>
      ) : null}

      {/* Upload */}
      {mode === "upload" && !uploadedFile && (
        <Button disabled={isProcessing || isTranscribing}>
          <label className="flex items-center gap-2 cursor-pointer m-0">
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm">Upload Video</span>
            <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          </label>
        </Button>
      )}

      {/* Uploaded file remove */}
      {mode === "upload" && uploadedFile && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isProcessing || isTranscribing} className="cursor-pointer">
              <Trash2 className="w-4 h-4 mr-2" /> Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove uploaded video?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You’ll need to upload again if required.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClearUploadedFile}>Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Extra Actions */}
      {hasVideo && !recording && (
        <>
          <Button variant="outline" onClick={onSave} disabled={isProcessing || isTranscribing} className="cursor-pointer">
            <Save className="w-4 h-4 mr-2" /> Save
          </Button>

          {!isTranscribing ? (
            <Button onClick={onTranscribe} disabled={isProcessing || isTranscribing} className="cursor-pointer">
              <FileText className="w-4 h-4 mr-2" /> Transcribe
            </Button>
          ) : (
            <Button onClick={onTranscribe} disabled={isProcessing || isTranscribing} className="cursor-pointer">
              <Loader2 className="animate-spin h-4 w-4 mr-2" /> Transcribing
            </Button>
          )}
        </>
      )}
    </div>
  );
}