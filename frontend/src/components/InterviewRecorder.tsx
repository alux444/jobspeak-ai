import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ActionButtons } from "./ActionButtons";
import { VideoDisplay } from "./VideoDisplay";

interface InterviewRecorderProps {
  mode: "record" | "upload";
  stream?: MediaStream | null;
  recordedChunks: Blob[];
  uploadedFile: File | null;
  recording: boolean;
  isProcessing: boolean;
  isTranscribing: boolean;
  onSwitchMode: (mode: "record" | "upload") => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUpload: (file: File) => void;
  onClearUploadedFile: () => void;
  onTranscribe: () => void;
  onSave: () => void;
}

export default function InterviewRecorder(props: InterviewRecorderProps) {
  const hasVideo = (props.mode === "record" && props.recordedChunks.length > 0 && !props.recording) || (props.mode === "upload" && !!props.uploadedFile);

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <Tabs value={props.mode} onValueChange={value => props.onSwitchMode(value as "record" | "upload")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record" className="cursor-pointer">Record</TabsTrigger>
          <TabsTrigger value="upload" className="cursor-pointer">Upload</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Video Display */}
      <VideoDisplay
        mode={props.mode}
        recording={props.recording}
        stream={props.stream}
        recordedChunks={props.recordedChunks}
        uploadedFile={props.uploadedFile}
      />

      {/* Buttons */}
      <ActionButtons
        mode={props.mode}
        recording={props.recording}
        hasVideo={hasVideo}
        uploadedFile={props.uploadedFile}
        isProcessing={props.isProcessing}
        isTranscribing={props.isTranscribing}
        onStartRecording={props.onStartRecording}
        onStopRecording={props.onStopRecording}
        onFileUpload={props.onFileUpload}
        onClearUploadedFile={props.onClearUploadedFile}
        onTranscribe={props.onTranscribe}
        onSave={props.onSave}
      />
    </div>
  );
}