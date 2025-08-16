import { useState } from "react";
import { type JobDescriptionCategory, jobDescriptionOptions } from "../../types/jobDescriptions";
import { CustomJobInput } from "./CustomJobInput";
import { JobSelector } from "./JobSelector";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

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

  const handleModeToggle = (value: string) => {
    const isCustom = value === "custom";
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
      <div className="items-center mb-4 transition-colors">
        <Tabs defaultValue="select" onValueChange={handleModeToggle}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Select Job</TabsTrigger>
            <TabsTrigger value="custom">Custom Job</TabsTrigger>
          </TabsList>
        </Tabs>
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