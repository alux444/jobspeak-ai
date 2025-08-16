import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { VideoDisplay } from "./VideoDisplay";

interface InterviewRecorderProps {
  stream?: MediaStream | null;
  recordedChunks: Blob[];
  uploadedFile: File | null;
  recording: boolean;
  isProcessing: boolean;
  isTranscribing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUpload: (file: File) => void;
  onClearUploadedFile: () => void;
  onTranscribe: () => void;
  onSave: () => void;
}

export default function InterviewRecorder(props: InterviewRecorderProps) {
  const [mode, setMode] = useState<"record" | "upload">("record");
  const { recordedChunks, uploadedFile, recording } = props;

  const hasVideo = (mode === "record" && recordedChunks.length > 0 && !recording) || (mode === "upload" && !!uploadedFile);

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={(val: string) => setMode(val as "record" | "upload")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record">Record</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Video Display */}
      <VideoDisplay
        mode={mode}
        recording={recording}
        stream={props.stream}
        recordedChunks={recordedChunks}
        uploadedFile={uploadedFile}
      />

      {/* Buttons */}
      <ActionButtons
        mode={mode}
        recording={recording}
        hasVideo={hasVideo}
        uploadedFile={uploadedFile}
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