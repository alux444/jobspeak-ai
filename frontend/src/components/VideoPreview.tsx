import React, { useRef, useEffect } from "react";

interface VideoPreviewProps {
  stream: MediaStream | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) return null;

  return (
    <div className="video-preview">
      <video ref={videoRef} autoPlay muted style={{ width: 400, marginTop: 16 }} />
    </div>
  );
};

export default VideoPreview; 