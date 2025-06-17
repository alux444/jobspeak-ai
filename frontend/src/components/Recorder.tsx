import React, { useRef, useEffect, useState } from "react";

const Recorder: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
    URL.revokeObjectURL(url);
    setRecordedChunks([]);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setStream(stream);
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {stream && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ width: 400, marginTop: 16 }}
          />
        </div>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={saveRecording}>Save Recording</button>
      )}
    </div>
  );
};

export default Recorder;
