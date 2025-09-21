import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  duration: number; // seconds
  autoStart?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

export function useTimer({ duration, autoStart = false, onComplete, onStart }: UseTimerOptions) {
  const [active, setActive] = useState(autoStart);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer
  const start = useCallback(() => {
    setActive(true);
    if (onStart) onStart();
  }, [onStart]);

  // Stop timer
  const stop = useCallback(() => {
    setActive(false);
    setSecondsLeft(duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [duration]);

  // Reset timer
  const reset = useCallback(() => {
    setSecondsLeft(duration);
    setActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [duration]);

  useEffect(() => {
    setSecondsLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setActive(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, onComplete]);

  return {
    secondsLeft,
    percent: Math.max(0, Math.round((secondsLeft / duration) * 100)),
    active,
    start,
    stop,
    reset,
  };
}
