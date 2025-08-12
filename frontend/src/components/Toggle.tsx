import React from "react";

interface ToggleProps {
  isCustomMode: boolean;
  onToggle: (isCustom: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  isCustomMode,
  onToggle,
  leftLabel = "Default",
  rightLabel = "Custom",
  disabled
}) => {
  return (
    <div className="mode-switcher">
      <button
        className={`toggle-option ${!isCustomMode ? "active" : ""}`}
        onClick={() => onToggle(false)}
        disabled={disabled}
      >
        {leftLabel}
      </button>
      <button
        className={`toggle-option ${isCustomMode ? "active" : ""}`}
        onClick={() => onToggle(true)}
        disabled={disabled}
      >
        {rightLabel}
      </button>
    </div>
  );
};
