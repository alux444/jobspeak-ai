import React, { useRef, useEffect } from "react";
import { Video } from "lucide-react";

interface VideoContainerProps {
  stream?: MediaStream | null;
  src?: string | null;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  stream,
  src,
  autoPlay = false,
  muted = false,
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full rounded-md border overflow-hidden bg-muted flex items-center justify-center aspect-video transition-colors">
      {stream || src ? (
        <video
          ref={videoRef}
          src={src || undefined}
          autoPlay={autoPlay}
          muted={muted}
          controls={controls}
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
          <Video className="h-12 w-12" />
          <p className="text-sm">Video will appear here</p>
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
