import React, { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  running?: boolean;
  onStart?: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  duration,
  onComplete,
  running = true,
  onStart,
}) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      if (onStart) onStart();
      setElapsedMs(0);
      intervalRef.current = setInterval(() => {
        setElapsedMs((prev) => {
          const next = prev + 20; // update every 20ms for smoother progress
          if (next >= duration * 1000) {
            clearInterval(intervalRef.current!);
            if (onComplete) onComplete();
            return duration * 1000;
          }
          return next;
        });
      }, 20);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete, onStart, running, duration]);

  useEffect(() => {
    setElapsedMs(0);
  }, [duration]);

  const secondsLeft = Math.max(0, duration - Math.floor(elapsedMs / 1000));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percent = Math.max(
    0,
    100 * (1 - elapsedMs / (duration * 1000))
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Progress
        value={percent}
        className="w-full max-w-xs h-1 mb-2"
      />
      <span className="text-sm font-mono text-muted-foreground select-none tracking-wide">
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
};
