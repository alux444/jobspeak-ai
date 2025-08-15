import { useState } from "react";
import { type JobDescriptionCategory, jobDescriptionOptions } from "../../types/jobDescriptions";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CustomJobInput } from "./CustomJobInput";
import { JobSelector } from "./JobSelector";

interface JobDescriptionSelectorProps {
  selectedJobDescription: JobDescriptionCategory;
  setSelectedJobDescription: (category: JobDescriptionCategory) => void;
  setCustomJobDescription: (description: string | undefined) => void;
}

export const JobDescriptionSelector: React.FC<JobDescriptionSelectorProps> = ({
  selectedJobDescription,
  setSelectedJobDescription,
  setCustomJobDescription
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  const handleJobDescriptionChange = (category: JobDescriptionCategory, customDescription?: string) => {
    setSelectedJobDescription(category);
    setCustomJobDescription(customDescription);
  };

  const handleModeToggle = (isCustom: boolean) => {
    setIsCustomMode(isCustom);
    if (!isCustom) {
      // Reset to first predefined job when switching back
      handleJobDescriptionChange(jobDescriptionOptions[0].value);
    }
  };

  const handleCustomSave = (description: string) => {
    handleJobDescriptionChange('custom', description);
    setIsCustomMode(false);
  };

  const handleCustomCancel = () => {
    setIsCustomMode(false);
    handleJobDescriptionChange(selectedJobDescription); // Keep current selection
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Label htmlFor="custom-switch">Select Job</Label>
        <Switch
          id="custom-switch"
          checked={isCustomMode}
          onCheckedChange={handleModeToggle}
        />
        <Label htmlFor="custom-switch">Custom Job</Label>
      </div>
      {isCustomMode ? (
        <CustomJobInput
          onSave={handleCustomSave}
          onCancel={handleCustomCancel}
        />
      ) : (
        <JobSelector
          selectedJob={selectedJobDescription}
          onJobChange={(job) => handleJobDescriptionChange(job)}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
        />
      )}
    </div>
  );
};