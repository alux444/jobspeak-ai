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
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-lg font-semibold text-foreground cursor-pointer select-none px-2 py-1 rounded hover:bg-muted transition-colors"
      >
        <span>Target Role (optional)</span>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {expanded && (
        <div className="mt-2 animate-fade-in">
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
