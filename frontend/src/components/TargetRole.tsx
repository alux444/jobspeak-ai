import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JobDescriptionSelector } from "./JobDescriptionSelector/JobDescriptionSelector";
import type { JobDescriptionCategory } from "@/types/jobDescriptions";

interface TargetRoleProps {
  selectedJobDescription: JobDescriptionCategory;
  setSelectedJobDescription: (value: JobDescriptionCategory) => void;
  setCustomJobDescription: (value: string | undefined) => void;
}

export default function TargetRole({
  selectedJobDescription,
  setSelectedJobDescription,
  setCustomJobDescription,
}: TargetRoleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse Target Role" : "Expand Target Role"}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
        setExpanded(!expanded);
          }
        }}
      >
        <h2
          className={`text-lg font-semibold select-none ${
        expanded ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Target Role (optional)
        </h2>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {expanded && (
        <div className="mt-2">
          <JobDescriptionSelector
            selectedJobDescription={selectedJobDescription}
            setSelectedJobDescription={setSelectedJobDescription}
            setCustomJobDescription={setCustomJobDescription}
          />
        </div>
      )}
    </div>
  );
}
