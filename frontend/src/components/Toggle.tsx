import React from "react";

interface ToggleProps {
  isCustomMode: boolean;
  onToggle: (isCustom: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  isCustomMode,
  onToggle,
  leftLabel = "Default",
  rightLabel = "Custom",
}) => {
  return (
    <div className="toggle-container">
      <div
        className={`toggle-option ${!isCustomMode ? "active" : ""}`}
        onClick={() => onToggle(false)}
      >
        {leftLabel}
      </div>
      <div
        className={`toggle-option ${isCustomMode ? "active" : ""}`}
        onClick={() => onToggle(true)}
      >
        {rightLabel}
      </div>
    </div>
  );
};
