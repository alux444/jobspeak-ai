import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JobDescriptionSelector } from "./JobDescriptionSelector/JobDescriptionSelector";
import type { JobDescriptionCategory } from "@/types/jobDescriptions";
import { Button } from "./ui/button";

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
      <div className="flex items-center justify-between w-full">
        <h2
          className={`text-lg font-semibold select-none ${
            expanded ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Target Role (optional)
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-primary/10 cursor-pointer"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
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
