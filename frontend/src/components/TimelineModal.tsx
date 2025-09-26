import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface TimelineModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (thinkingTime: number, responseTime: number) => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ open, onClose, onConfirm }) => {
  const [thinkingTime, setThinkingTime] = useState(60); // 1 minute default
  const [responseTime, setResponseTime] = useState(90); // 1 minute 1/2 default

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Set Interview Timers</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Thinking Time Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Thinking Time Limit</label>
            <input
              type="range"
              min={30}
              max={180}
              value={thinkingTime}
              onChange={e => setThinkingTime(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
              <span>30s</span>
              <span>{Math.floor(thinkingTime / 60)}:{(thinkingTime % 60).toString().padStart(2, "0")}</span>
              <span>3m</span>
            </div>
          </div>
          {/* Response Time Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Response Time Limit</label>
            <input
              type="range"
              min={60}
              max={300}
              value={responseTime}
              onChange={e => setResponseTime(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
              <span>1m</span>
              <span>{Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, "0")}</span>
              <span>5m</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button
            onClick={() => onConfirm(thinkingTime, responseTime)}
            className="cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
