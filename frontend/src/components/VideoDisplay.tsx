import { useEffect, useMemo, useRef } from "react";
import { Video as VideoIcon } from "lucide-react";

// --- Video Display Component ---
interface VideoDisplayProps {
  mode: "record" | "upload";
  recording: boolean;
  stream?: MediaStream | null;
  recordedChunks: Blob[];
  uploadedFile: File | null;
}

export function VideoDisplay({ mode, recording, stream, recordedChunks, uploadedFile }: VideoDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playbackUrl = useMemo(() => {
    if (mode === "record" && recordedChunks.length > 0 && !recording) {
      return URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }));
    }
    if (mode === "upload" && uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    return null;
  }, [mode, recordedChunks, uploadedFile, recording]);

  useEffect(() => {
    if (!playbackUrl) return;
    return () => {
      URL.revokeObjectURL(playbackUrl);
    };
  }, [playbackUrl]);

  useEffect(() => {
    if (mode === "record" && recording && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [mode, recording, stream]);

  const hasVideo = (mode === "record" && recordedChunks.length > 0 && !recording) || (mode === "upload" && uploadedFile);

  return (
    <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center relative">
      {mode === "record" && recording && stream ? (
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
      ) : hasVideo && playbackUrl ? (
        <video key={playbackUrl} src={playbackUrl} controls muted={false} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center text-muted-foreground">
          <VideoIcon className="w-12 h-12" />
          <p className="mt-2 text-sm">{mode === "upload" ? "Upload a video" : "Video will appear here"}</p>
        </div>
      )}

      {mode === "record" && recording && (
        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-red-500">Recording</span>
        </div>
      )}
    </div>
  );
}